export default function Home() {
  fetch("http://localhost:3333/pools/count")
    .then((response) => response.json())
    .then((response) => console.log(response));

  return <h1 className="text-purple-600">hello</h1>;
}
