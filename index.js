function postDosen() {
  const newDosen = {
    nidn: "10006",
    nama_dosen: "latip s.kom",
    gender: "L",
    prodi: "Ti",
    email: "latip@example.com",
  };

  fetch("http://localhost:4000/dosen", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newDosen),
  })
    .then((res) => res.json())
    .then((data) => console.log("POST Dosen:", data))
    .catch((err) => console.error("Error:", err));
}

function putDosen() {
  const nidn = "10001";
  const updatedData = {
    nama_dosen: "Prof. reza baru di put",
    gender: "L",
    prodi: "TI",
    email: "reza@example.com",
  };

  fetch(`http://localhost:4000/dosen/${nidn}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  })
    .then((res) => res.json())
    .then((data) => console.log("PUT Dosen:", data))
    .catch((err) => console.error("Error:", err));
}

function deleteDosen() {
  const nidn = "10003";
  fetch(`http://localhost:4000/dosen/${nidn}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => console.log("DELETE Dosen:", data))
    .catch((err) => console.error("Error:", err));
}
function getDosenAdvanced() {
  fetch(
    "http://localhost:4000/dosen?prodi=tI&gender=L&sort=nama_dosen&order=ASC&limit=3&offset=0"
  )
    .then((res) => res.json())
    .then((data) => console.log("GET Dosen Advanced:", data))
    .catch((err) => console.error("Error:", err));
}

postDosen();
putDosen();
deleteDosen();
getDosenAdvanced();
