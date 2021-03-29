const decode = (): void => {
  const value = process.argv.slice(2).join(" ");
  const buffer = Buffer.from(value, "base64");

  process.stdout.write(buffer);
  process.stdout.end("\n");
};

decode();
