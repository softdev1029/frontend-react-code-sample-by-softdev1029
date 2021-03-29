const brotliDecompress = async (): Promise<void> => {
  const value = process.argv.slice(2).join(" ");
  const buffer = (await import("zlib")).brotliDecompressSync(
    Buffer.from(value, "base64")
  );

  process.stdout.write(buffer);
  process.stdout.end("\n");
};

// eslint-disable-next-line no-void
void brotliDecompress();
