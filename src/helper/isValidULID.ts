const isValidULID = (input: string): boolean => {
    const ulidRegex = /^[0-7][A-HJ-NP-Z0-9]{25}$/; // Valid ULID regex
    return ulidRegex.test(input);
};

export {
  isValidULID
}
