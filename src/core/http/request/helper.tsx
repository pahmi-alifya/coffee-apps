export const authHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

export const toJSON = async (res: Response) => {
  try {
    const data = await res.json();
    return data;
  } catch {
    return undefined;
  }
};
