-- CreateTable
CREATE TABLE "paper_wallets" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "balance" DECIMAL(18,8) NOT NULL DEFAULT 100000,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "paper_wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "holdings" (
    "id" TEXT NOT NULL,
    "wallet_id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "quantity" DECIMAL(18,8) NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "holdings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spot_orders" (
    "id" TEXT NOT NULL,
    "wallet_id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "side" TEXT NOT NULL,
    "quantity" DECIMAL(18,8) NOT NULL,
    "price" DECIMAL(18,8) NOT NULL,
    "total" DECIMAL(18,8) NOT NULL,
    "executed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "spot_orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "paper_wallets_user_id_key" ON "paper_wallets"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "holdings_wallet_id_symbol_key" ON "holdings"("wallet_id", "symbol");

-- AddForeignKey
ALTER TABLE "paper_wallets" ADD CONSTRAINT "paper_wallets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "holdings" ADD CONSTRAINT "holdings_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "paper_wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spot_orders" ADD CONSTRAINT "spot_orders_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "paper_wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
