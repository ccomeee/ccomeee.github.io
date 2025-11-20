import CodeBlock from "../CodeBlock";

export default function CodeBlockExample() {
  const sampleCode = `function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet("World");`;

  return (
    <div className="p-6 max-w-2xl">
      <CodeBlock code={sampleCode} language="javascript" />
    </div>
  );
}
