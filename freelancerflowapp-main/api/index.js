import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import PDFDocument from 'pdfkit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../server/.env') });

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Helper for data persistence
const DATA_DIR = process.env.VERCEL 
  ? path.join(process.cwd(), 'server', 'data')
  : path.resolve(__dirname, '../server/data');
const getFilePath = (filename) => path.join(DATA_DIR, filename);

const readData = (filename) => {
  try {
    const filePath = getFilePath(filename);
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return [];
  }
};

const writeData = (filename, data) => {
  try {
    const filePath = getFilePath(filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
    return false;
  }
};

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes
app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body;
  const users = readData('users.json');

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password // In a real app, hash this
  };

  users.push(newUser);
  writeData('users.json', users);

  const accessToken = jwt.sign({ email: newUser.email, id: newUser.id }, process.env.JWT_SECRET);
  res.json({ accessToken, user: { id: newUser.id, name: newUser.name, email: newUser.email } });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const users = readData('users.json');
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    const accessToken = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_SECRET);
    res.json({ accessToken, user: { id: user.id, name: user.name, email: user.email } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// ─── AI Client Risk Score Engine ───────────────────────────────────────
function calculateRiskScore(client) {
  let score = 0;
  const reasons = [];

  // Late payments > 2 → +40
  if ((client.late_payments || 0) > 2) {
    score += 40;
    reasons.push(`${client.late_payments} late payments detected`);
  } else if ((client.late_payments || 0) > 0) {
    score += (client.late_payments || 0) * 10;
    reasons.push(`${client.late_payments} late payment(s) on record`);
  }

  // Any overdue invoice → +30
  if ((client.overdue_invoices || 0) > 0) {
    score += 30;
    reasons.push(`${client.overdue_invoices} overdue invoice(s)`);
  }

  // Response time > 2 days → +20
  if ((client.avg_response_time_days || 0) > 2) {
    score += 20;
    reasons.push(`Slow response time (~${client.avg_response_time_days} days)`);
  }

  // More than 5 completed projects → -10 (loyalty bonus)
  if ((client.completed_projects || 0) > 5) {
    score -= 10;
    reasons.push('Long-term client loyalty bonus applied');
  }

  // Clamp 0–100
  score = Math.max(0, Math.min(100, score));

  // Classify
  let risk_level;
  if (score <= 30) risk_level = 'Good';
  else if (score <= 60) risk_level = 'Medium';
  else risk_level = 'Risky';

  // Generate insight
  let insight;
  if (reasons.length === 0) {
    insight = 'Clean payment history — reliable client';
  } else if (risk_level === 'Good') {
    insight = 'Minor flags, but overall dependable';
  } else if (risk_level === 'Medium') {
    insight = reasons[0]; // Most impactful reason
  } else {
    insight = `⚠ ${reasons.slice(0, 2).join(' · ')}`;
  }

  return { risk_score: score, risk_level, insight };
}

// Clients & Projects
app.get('/api/clients', authenticateToken, (req, res) => {
  const clients = readData('clients.json');
  
  // Enrich every client with computed AI risk score
  const enrichedClients = clients.map(client => {
    const risk = calculateRiskScore(client);
    return { ...client, ...risk };
  });
  
  res.json(enrichedClients);
});

// Individual client risk endpoint
app.get('/api/clients/:id/risk', authenticateToken, (req, res) => {
  const clients = readData('clients.json');
  const client = clients.find(c => c.id === req.params.id);
  
  if (!client) {
    return res.status(404).json({ message: 'Client not found' });
  }
  
  const risk = calculateRiskScore(client);
  res.json(risk);
});


//  Explainable Risk Details 
app.get('/api/clients/:id/risk-details', authenticateToken, (req, res) => {
  const clients = readData('clients.json');
  const client = clients.find(c => String(c.id) === String(req.params.id));
  if (!client) return res.status(404).json({ message: 'Client not found' });

  const { risk_score, risk_level } = calculateRiskScore(client);

  const reasons = [];
  if ((client.late_payments || 0) > 2) reasons.push('Multiple late payments detected');
  else if ((client.late_payments || 0) > 0) reasons.push(`${client.late_payments} late payment(s) on record`);
  if ((client.overdue_invoices || 0) > 0) reasons.push('Outstanding overdue invoices');
  if ((client.avg_response_time_days || 0) > 2) reasons.push('Slow communication pattern');
  if ((client.completed_projects || 0) > 5) reasons.push('Long-term client  loyalty bonus applied');

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const base = Math.max(0, risk_score - 35);
  const seed = (client.late_payments || 0) * 3 + (client.overdue_invoices || 0) * 5;
  const timeline = months.map((date, i) => {
    const wave = Math.round(Math.sin(i + seed) * 6);
    const value = Math.round(base + ((risk_score - base) * i) / 5) + wave;
    return { date, risk: Math.min(100, Math.max(0, value)) };
  });

  let suggestion;
  if (risk_score > 60) suggestion = 'Request partial advance payment before continuing work.';
  else if ((client.overdue_invoices || 0) > 0) suggestion = 'Follow up immediately for the pending payment.';
  else if ((client.avg_response_time_days || 0) > 2) suggestion = 'Set clear communication expectations with this client.';
  else suggestion = 'Client is in good standing  keep nurturing the relationship.';

  res.json({ risk_score, risk_level, reasons, timeline, suggestion });
});
app.get('/api/projects', authenticateToken, (req, res) => {
  const projects = readData('projects.json');
  res.json(projects);
});

// Invoices CRUD
app.get('/api/invoices', authenticateToken, (req, res) => {
  const invoices = readData('invoices.json');
  res.json(invoices);
});

app.post('/api/invoices', authenticateToken, (req, res) => {
  try {
    const { clientId, clientName, projectName, items, date, dueDate, notes } = req.body;
    console.log('POST /api/invoices - body:', JSON.stringify(req.body).slice(0, 200));
    
    if (!clientId || !items || !items.length) {
      return res.status(400).json({ message: 'Missing required fields: clientId and items are required' });
    }

    const invoices = readData('invoices.json');
    
    // Safely extract the last invoice number
    let lastInvoiceNum = 0;
    if (invoices.length > 0 && invoices[0].invoiceNumber) {
      const parts = invoices[0].invoiceNumber.split('-');
      lastInvoiceNum = parseInt(parts[parts.length - 1]) || 0;
    }
    const newNum = (lastInvoiceNum + 1).toString().padStart(3, '0');
    
    const totalAmount = items.reduce((sum, item) => sum + ((Number(item.quantity) || 0) * (Number(item.rate) || 0)), 0);
    
    const newInvoice = {
      id: `INV-${newNum}`,
      clientId: String(clientId),
      clientName: clientName || '',
      projectName: projectName || '',
      invoiceNumber: `INV-${newNum}`,
      items: items.map(item => ({
        name: item.name || '',
        quantity: Number(item.quantity) || 0,
        rate: Number(item.rate) || 0,
        total: (Number(item.quantity) || 0) * (Number(item.rate) || 0)
      })),
      totalAmount,
      status: 'Pending',
      date: date || new Date().toISOString().split('T')[0],
      dueDate: dueDate || '',
      notes: notes || '',
      createdAt: new Date().toISOString()
    };

    invoices.unshift(newInvoice);
    const written = writeData('invoices.json', invoices);
    
    if (!written) {
      return res.status(500).json({ message: 'Failed to save invoice to disk' });
    }
    
    console.log('Invoice created successfully:', newInvoice.id);
    res.status(201).json(newInvoice);
  } catch (err) {
    console.error('Error creating invoice:', err);
    res.status(500).json({ message: 'Internal server error while creating invoice' });
  }
});

// PDF Generation
app.get('/api/invoices/:id/pdf', authenticateToken, (req, res) => {
  const invoices = readData('invoices.json');
  const invoice = invoices.find(inv => inv.id === req.params.id);

  if (!invoice) {
    return res.status(404).json({ message: 'Invoice not found' });
  }

  const doc = new PDFDocument({ margin: 50, size: 'A4' });
  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Invoice_${invoice.invoiceNumber}.pdf`);
  
  doc.pipe(res);

  // Professional Layout
  // Header
  doc.fillColor('#000000').fontSize(24).text('FREELANCER FLOW', 50, 50);
  doc.fontSize(10).fillColor('#666666').text('Premium Freelance Solutions', 50, 80);
  
  doc.fillColor('#000000').fontSize(20).text('INVOICE', 400, 50, { align: 'right' });
  doc.fontSize(10).fillColor('#666666').text(`#${invoice.invoiceNumber}`, 400, 75, { align: 'right' });
  doc.text(`Date: ${invoice.date}`, 400, 90, { align: 'right' });
  if (invoice.dueDate) doc.text(`Due Date: ${invoice.dueDate}`, 400, 105, { align: 'right' });

  doc.moveDown(4);

  // Client Info
  doc.fillColor('#000000').fontSize(12).text('BILL TO:', 50, 160);
  doc.fontSize(14).text(invoice.clientName, 50, 175);
  if (invoice.projectName) {
    doc.fontSize(10).fillColor('#666666').text(`Project: ${invoice.projectName}`, 50, 195);
  }

  doc.moveDown(3);

  // Table Header
  const tableTop = 250;
  doc.fillColor('#F5F5F5').rect(50, tableTop, 500, 20).fill();
  doc.fillColor('#000000').fontSize(10).text('ITEM', 60, tableTop + 5);
  doc.text('QTY', 300, tableTop + 5);
  doc.text('RATE', 380, tableTop + 5);
  doc.text('TOTAL', 480, tableTop + 5);

  // Line Items
  let currentY = tableTop + 30;
  invoice.items.forEach(item => {
    doc.text(item.name, 60, currentY);
    doc.text(item.quantity.toString(), 300, currentY);
    doc.text(`$${item.rate.toLocaleString()}`, 380, currentY);
    doc.text(`$${item.total.toLocaleString()}`, 480, currentY);
    
    currentY += 25;
    // Draw fine line
    doc.strokeColor('#EEEEEE').moveTo(50, currentY - 5).lineTo(550, currentY - 5).stroke();
  });

  // Totals
  doc.moveDown(2);
  const totalY = currentY + 20;
  doc.fontSize(12).font('Helvetica-Bold').text('TOTAL AMOUNT:', 350, totalY);
  doc.fontSize(16).text(`$${invoice.totalAmount.toLocaleString()}`, 450, totalY, { align: 'right' });

  // Status Badge
  const statusColor = invoice.status === 'Paid' ? '#10B981' : invoice.status === 'Overdue' ? '#F43F5E' : '#3B82F6';
  doc.fillColor(statusColor).rect(50, totalY, 80, 20).fill();
  doc.fillColor('#FFFFFF').fontSize(8).text(invoice.status.toUpperCase(), 55, totalY + 6, { width: 70, align: 'center' });

  // Footer
  if (invoice.notes) {
    doc.moveDown(4);
    doc.fillColor('#666666').fontSize(10).font('Helvetica-Oblique').text('Notes:', 50);
    doc.font('Helvetica').text(invoice.notes, 50);
  }

  doc.end();
});

app.post('/api/ai/chat', authenticateToken, async (req, res) => {
  try {
    const { prompt } = req.body;
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:8080", // Optional, for OpenRouter rankings
        "X-Title": "Freelancer Flow", // Optional
      },
      body: JSON.stringify({
        "model": "google/gemini-2.0-flash-001", // Using Gemini via OpenRouter
        "messages": [
          { "role": "user", "content": prompt }
        ],
      })
    });

    const data = await response.json();
    if (data.choices && data.choices[0] && data.choices[0].message) {
      res.json({ text: data.choices[0].message.content });
    } else {
      console.error('OpenRouter Error:', data);
      res.status(500).json({ error: 'Failed to generate content from AI' });
    }
  } catch (error) {
    console.error('AI Proxy Error:', error);
    res.status(500).json({ error: 'Failed to connect to AI service' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
  });
}

export default app;
