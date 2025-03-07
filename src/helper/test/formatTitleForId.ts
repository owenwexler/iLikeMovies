import { describe, it, expect } from 'vitest';
import { formatTitleForId } from '../formatTitleForId';

describe('formatTitleForId', () => {
  it('should replace specified characters with hyphens', () => {
    expect(formatTitleForId("hello!world@2024"))
      .toBe("hello-world-2024");
  });

  it('should replace spaces with hyphens', () => {
    expect(formatTitleForId("hello world 2024"))
      .toBe("hello-world-2024");
  });

  it('should convert the string to lowercase', () => {
    expect(formatTitleForId("Hello World"))
      .toBe("hello-world");
  });

  it('should handle multiple special characters correctly', () => {
    expect(formatTitleForId("H@e#l$l%o^ W&o*r(l)d!"))
      .toBe("h-e-l-l-o--w-o-r-l-d-");
  });

  it('should handle consecutive spaces and special characters correctly', () => {
    expect(formatTitleForId("  Hello  !! World   "))
      .toBe("--hello----world---");
  });

  it('should return an empty string if input is empty', () => {
    expect(formatTitleForId(""))
      .toBe("");
  });
});
