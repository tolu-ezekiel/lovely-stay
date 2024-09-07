-- CreateIndex
CREATE INDEX "languages_user_id_language_idx" ON "languages"("user_id", "language");

-- CreateIndex
CREATE INDEX "users_username_idx" ON "users"("username");

-- CreateIndex
CREATE INDEX "users_location_idx" ON "users"("location");
