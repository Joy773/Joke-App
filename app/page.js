import JokeFetcher from "./components/JokeFetcher";

export default function Home() {


  return (
    <div>
      <section className="bg-sky-950 py-3">
        <h1 className="font-mono text-3xl text-center">Jokify</h1>
      </section>
      <JokeFetcher />
    </div>
  );
}
