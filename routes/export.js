const express = require('express');
const ExcelJS = require('exceljs');
const router = express.Router();
const data = require('../data/employees');

router.post('/export', async (req, res) => {
  try {
    const { columns, rows } = req.body;

    if (!columns || !rows || !Array.isArray(columns) || !Array.isArray(rows)) {
      return res.status(400).json({ error: 'Body must have "columns" (array) and "rows" (array).' });
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Export');

    sheet.columns = columns.map(col => ({
      header: col.header,
      key:    col.key,
      width:  col.width || 20,
    }));

    const headerRow = sheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.font      = { bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
      cell.fill      = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F4E79' } };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });
    headerRow.height = 30;

    rows.forEach((row, i) => {
      const dataRow = sheet.addRow(row);
      dataRow.eachCell((cell) => {
        cell.fill = {
          type: 'pattern', pattern: 'solid',
          fgColor: { argb: i % 2 === 0 ? 'FFDCE6F1' : 'FFFFFFFF' },
        };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      });
      dataRow.height = 22;
    });

    sheet.views = [{ state: 'frozen', ySplit: 1 }];

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="export.xlsx"');

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate Excel file.' });
  }
});

// ── GET /api/data  – return raw JSON so the UI table renders ────────
router.get('/data', (req, res) => {
  res.json(data);
});

module.exports = router;
