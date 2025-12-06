const express = require("express");
const router = express.Router();
const db = require("../models/db");

router.get("/", (req, res) => {
  const {
    prodi,
    gender,
    sort = "nidn",
    order = "ASC",
    limit = 10,
    offset = 0,
  } = req.query;
  let sql = "SELECT * FROM dosen";
  const params = [];

  // nilai tambah
  if (prodi || gender) {
    sql += " WHERE";
    if (prodi) {
      sql += " prodi = ?";
      params.push(prodi);
    }
    if (gender) {
      if (prodi) sql += " AND";
      sql += " gender = ?";
      params.push(gender);
    }
  }

  // nilai tambah
  sql += ` ORDER BY ${sort} ${order}`;

  sql += " LIMIT ? OFFSET ?";
  params.push(parseInt(limit), parseInt(offset));

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ message: "Error", error: err });
    res.json(results);
  });
});

router.get("/:nidn", (req, res) => {
  const nidn = req.params.nidn;
  db.query("SELECT * FROM dosen WHERE nidn = ?", [nidn], (err, results) => {
    if (err) return res.status(500).json({ message: "Error" });
    if (results.length === 0)
      return res.status(404).json({ message: "Not Found" });
    res.json(results[0]);
  });
});

router.post("/", (req, res) => {
  const { nidn, nama_dosen, gender, prodi, email } = req.body;
  db.query(
    "INSERT INTO dosen VALUES (?,?,?,?,?)",
    [nidn, nama_dosen, gender, prodi, email],
    (err) => {
      if (err) return res.status(500).json({ message: "Error" });
      res.json({ message: "Dosen added successfully" });
    }
  );
});

router.put("/:nidn", (req, res) => {
  const nidn = req.params.nidn;
  const { nama_dosen, gender, prodi, email } = req.body;
  db.query(
    "UPDATE dosen SET nama_dosen=?, gender=?, prodi=?, email=? WHERE nidn=?",
    [nama_dosen, gender, prodi, email, nidn],
    (err) => {
      if (err) return res.status(500).json({ message: "Error" });
      res.json({ message: "Dosen updated successfully" });
    }
  );
});

router.delete("/:nidn", (req, res) => {
  const nidn = req.params.nidn;
  db.query("DELETE FROM dosen WHERE nidn=?", [nidn], (err) => {
    if (err) return res.status(500).json({ message: "Error" });
    res.json({ message: "Dosen deleted successfully" });
  });
});

module.exports = router;
