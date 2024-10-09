// router/index.js
const express = require('express');
const router = express.Router();
const db = require('../db/configDB');

// Thêm một bản ghi vào bảng bất kỳ theo 'table'
router.post('/:table', async (req, res) => {
  try {
    const { table } = req.params; // Lấy tên bảng từ URL
    const data = req.body; // Lấy dữ liệu từ body
    const [id] = await db(table).insert(data); // Chèn dữ liệu vào bảng tương ứng
    res.status(201).json({ message: 'Thêm thành công!', id });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Không thể thêm dữ liệu' });
  }
});

// Lấy tất cả các bản ghi từ bảng bất kỳ theo 'table'
router.get('/:table', async (req, res) => {
  try {
    const { table } = req.params; // Lấy tên bảng từ URL
    const records = await db(table).select('*'); // Truy vấn tất cả bản ghi từ bảng tương ứng
    res.status(200).json(records);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Không thể lấy dữ liệu' });
  }
});

router.get('/:table/:id', async (req, res) => {
    try {
        const { id } = req.params; // L
      const { table } = req.params; // Lấy tên bảng từ URL
      const records = await db(table).select('*').where('id',id); // Truy vấn tất cả bản ghi từ bảng tương ứng
      res.status(200).json(records);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Không thể lấy dữ liệu' });
    }
  });

// Cập nhật một bản ghi trong bảng bất kỳ theo 'table' và 'id'
router.put('/:table/:id', async (req, res) => {
  try {
    const { table, id } = req.params; // Lấy tên bảng và id từ URL
    const data = req.body; // Lấy dữ liệu từ body
    const affectedRows = await db(table).where({ id }).update(data); // Cập nhật dữ liệu theo ID
    if (affectedRows) {
      res.status(200).json({ message: 'Cập nhật thành công!' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy bản ghi' });
    }
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Không thể cập nhật dữ liệu' });
  }
});

// Xóa một bản ghi trong bảng bất kỳ theo 'table' và 'id'
router.delete('/:table/:id', async (req, res) => {
  try {
    const { table, id } = req.params; // Lấy tên bảng và id từ URL
    const affectedRows = await db(table).where({ id }).del(); // Xóa bản ghi theo ID
    if (affectedRows) {
      res.status(200).json({ message: 'Xóa thành công!' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy bản ghi' });
    }
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ error: 'Không thể xóa dữ liệu' });
  }
});

module.exports = router;
