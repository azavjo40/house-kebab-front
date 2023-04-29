interface IOptionsFetch {
  method?: string;
  headers?: HeadersInit;
  body?: any;
  referrer?: string;
  referrerPolicy?: ReferrerPolicy;
  mode?: RequestMode;
  credentials?: RequestCredentials;
  cache?: RequestCache;
  redirect?: RequestRedirect;
  integrity?: string;
  keepalive?: boolean;
  signal?: AbortSignal | null;
}

export async function useApiFetch(url: string, options: IOptionsFetch) {
  const requestOptions: RequestInit = {
    method: options.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options.body),
  };

  try {
    const response = await fetch(url, requestOptions);
    return response;
  } catch (error) {
    console.error(error);
  }
}
