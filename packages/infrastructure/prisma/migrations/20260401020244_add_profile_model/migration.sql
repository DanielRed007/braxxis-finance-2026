-- CreateTable
CREATE TABLE "profiles" (
    "user_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL DEFAULT '',
    "date_of_birth" TEXT NOT NULL DEFAULT '',
    "country" TEXT NOT NULL DEFAULT '',
    "city" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL DEFAULT '',
    "postal_code" TEXT NOT NULL DEFAULT '',
    "tax_id" TEXT NOT NULL DEFAULT '',
    "employment_status" TEXT NOT NULL DEFAULT '',
    "employer" TEXT NOT NULL DEFAULT '',
    "job_title" TEXT NOT NULL DEFAULT '',
    "investment_experience" TEXT NOT NULL DEFAULT '',
    "risk_tolerance" TEXT NOT NULL DEFAULT '',
    "annual_income" TEXT NOT NULL DEFAULT '',
    "net_worth" TEXT NOT NULL DEFAULT '',
    "investment_goal" TEXT NOT NULL DEFAULT '',
    "source_of_funds" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
