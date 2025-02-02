export interface TransactionalAdapterOptions<TTx, TOptions> {
    wrapWithTransaction: (
        options: TOptions,
        fn: (...args: any[]) => Promise<any>,
        setTx: (client?: TTx) => void,
    ) => Promise<any>;
    getFallbackInstance: () => TTx;
}

export type TransactionalOptionsAdapterFactory<TConnection, TTx, TOptions> = (
    connection: TConnection,
) => TransactionalAdapterOptions<TTx, TOptions>;

export interface TransactionalAdapter<TConnection, TTx, TOptions> {
    /**
     * Token used to inject the `connection` into the adapter.
     * It is later used to create transactions.
     */
    connectionToken: any;

    /**
     * Function that accepts the `connection` based on the `connectionToken`
     *
     * Returns an object implementing the `TransactionalAdapterOptions` interface
     * with the `startTransaction` and `getTx` methods.
     */
    optionsFactory: TransactionalOptionsAdapterFactory<
        TConnection,
        TTx,
        TOptions
    >;
}

export interface TransactionalPluginOptions<TConnection, TTx, TOptions> {
    adapter: TransactionalAdapter<TConnection, TTx, TOptions>;
    imports?: any[];
}

export type TTxFromAdapter<TAdapter> = TAdapter extends TransactionalAdapter<
    any,
    infer TClient,
    any
>
    ? TClient
    : never;

export type TOptionsFromAdapter<TAdapter> =
    TAdapter extends TransactionalAdapter<any, any, infer TOptions>
        ? TOptions
        : never;
