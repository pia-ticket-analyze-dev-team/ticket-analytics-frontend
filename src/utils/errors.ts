export const getTicketDeleteErrorMessage = (error: unknown, fallback: string): string => {
  const status = error instanceof Error && "status" in error ? (error as { status?: number }).status : undefined;

  if (status === 500) {
    return "This ticket has history records and can't be deleted.";
  }

  return fallback;
};
