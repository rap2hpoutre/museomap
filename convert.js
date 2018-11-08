const a = require("./public/museo.json");

const withHttp = url => (!/^https?:\/\//i.test(url) ? `http://${url}` : url);

const c = a
  .map(b => {
    return {
      location: b.location,
      name: b.NOMOFF,
      topic: b.DOMPAL || b.THEMES,
      phone: b.TEL_M.replace(/^.*?((?:[0-9][0-9]\s*){5}).*$/, "$1"),
      img: b.VIDEO.split(";")[0],
      url: withHttp(b.URL_M),
      desc: (b.ATOUT || b.INTERET)
        .replace(/#/g, "\n")
        .replace(/&quot;/g, '"')
        .replace(/\u0092/g, "'"),
      id: b.REF,
      address: [b.ADRL1_M, b.CP_M, b.VILLE_M].filter(a => a).join(", ")
    };
  })
  .filter(b => b.location && b.location.lat);
console.log(JSON.stringify(c));
