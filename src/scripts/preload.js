console.log("preload");

const updated = await fetch("http://localhost:3000/api/update")
    .then((res) => res.json())
    .then((res) => res.ok);