export interface AnyAction {
  type: string;
  payload?: unknown;
  error?: unknown;
}

export interface Action<Payload = unknown> {
  type: string;
  payload: Payload;
  error?: unknown;
}

export interface ActionCreator<Payload = unknown> {
  (payload: Payload): Action<Payload>;
  type: string;
  match(action: AnyAction): action is Action<Payload>;
}

export interface AsyncActionCreators<Params, Result, ErrorT> {
  type: string;
  started: ActionCreator<Params>;
  done: ActionCreator<
    Params extends undefined
      ? { params?: Params; result: Result }
      : { params: Params; result: Result }
  >;
  failed: ActionCreator<
    Params extends undefined
      ? { params?: Params; error: ErrorT }
      : { params: Params; error: ErrorT }
  >;
}

export interface ActionCreatorFactory {
  <Payload = unknown>(type: string): ActionCreator<Payload>;
  async<Params, Result, ErrorT>(type: string): AsyncActionCreators<Params, Result, ErrorT>;
}

function createActionCreator<Payload = unknown>(type: string): ActionCreator<Payload> {
  const creator = ((payload: Payload) => ({
    type,
    payload,
  })) as ActionCreator<Payload>;

  creator.type = type;
  creator.match = (action: AnyAction): action is Action<Payload> => action.type === type;
  return creator;
}

function withPrefix(prefix: string | undefined, type: string): string {
  if (!prefix) return type;
  return `${prefix}/${type}`;
}

export function actionCreatorFactory(prefix?: string): ActionCreatorFactory {
  const factory = ((type: string) =>
    createActionCreator(withPrefix(prefix, type))) as ActionCreatorFactory;

  factory.async = <Params, Result, ErrorT>(
    type: string,
  ): AsyncActionCreators<Params, Result, ErrorT> => {
    const baseType = withPrefix(prefix, type);
    return {
      type: baseType,
      started: createActionCreator<Params>(`${baseType}_STARTED`),
      done: createActionCreator<
        Params extends undefined
          ? { params?: Params; result: Result }
          : { params: Params; result: Result }
      >(`${baseType}_DONE`),
      failed: createActionCreator<
        Params extends undefined
          ? { params?: Params; error: ErrorT }
          : { params: Params; error: ErrorT }
      >(`${baseType}_FAILED`),
    };
  };

  return factory;
}

export function isType<Payload>(
  action: AnyAction,
  creator: ActionCreator<Payload>,
): action is Action<Payload> {
  return action.type === creator.type;
}

export default actionCreatorFactory;
