const ResultPanel = ({ title, content }) => {
  if (!content) return null;

  return (
    <section className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>
      <pre className="whitespace-pre-wrap text-sm leading-6">{content}</pre>
    </section>
  );
};

export default ResultPanel;
