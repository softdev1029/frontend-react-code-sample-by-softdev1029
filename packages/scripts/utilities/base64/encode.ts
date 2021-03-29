const encode = (): void => {
  const value = process.argv.slice(2).join(" ");
  const buffer = Buffer.from(value, "utf16le");

  process.stdout.write(buffer.toString("base64"));
  process.stdout.end("\n");
};

encode();
