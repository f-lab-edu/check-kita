export const textOverflowStyles = (lines: number) => `
  overflow-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${lines};
  -webkit-box-orient: vertical;
`;
