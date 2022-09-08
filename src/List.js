import { useEffect, useState } from "react";

function List() {
  const [links, setLinks] = useState([]);
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    const unsubscribe = async () => {
      await fetch("https://catfact.ninja/facts")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setLinks(data.links);
        });
    };

    return () => {
      unsubscribe();
    };
  }, []);

  const themeMode = () => {
    if (theme === false) {
      setTheme(true);
      document.body.style.backgroundColor = "black";
    } else {
      setTheme(false);
      document.body.style.backgroundColor = "white";
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ color: theme === false ? "black" : "white" }}>
        Code Challenge
      </h1>
      <span>
        <button onClick={() => themeMode()}>
          {theme === false ? "Light Mode" : "Dark Mode"}
        </button>
      </span>
      {links.map((link) => (
        <div key={link.id}>
          <a
            href={link.url}
            target="_blank"
            rel="noreferrer"
            style={{
              color: theme === false ? "black" : "white",
              textDecoration: "none",
              lineHeight: 2,
            }}
          >
            {link.url}
          </a>
        </div>
      ))}
    </div>
  );
}

export default List;
