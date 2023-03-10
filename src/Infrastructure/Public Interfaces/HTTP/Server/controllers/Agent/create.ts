/* interface IHTTPReq {
  body: Record<string, unknown>;
} */

export const create = async (/* req: IHTTPReq, res: unknown */): Promise<void> => {
  /* const repo = new AgentInMemoryDataRepository();
  const {
    name,
  } = req.body;
  const { error, data } = await CreateAgent({ name }, { repo });
  if (error) {
    return error500(res, error);
  }
  return created(res, serviceLocator.userSerializer.serialize(data)); */
  await Promise.resolve();
  throw new Error('not implemented');
};
