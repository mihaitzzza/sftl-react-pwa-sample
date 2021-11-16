IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;

GO

CREATE TABLE [ProductCategory] (
    [Id] uniqueidentifier NOT NULL,
    [Name] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_ProductCategory] PRIMARY KEY ([Id])
);

GO

CREATE TABLE [Product] (
    [Id] uniqueidentifier NOT NULL,
    [Description] nvarchar(max) NULL,
    [Name] nvarchar(max) NOT NULL,
    [CreateDate] datetime2 NOT NULL,
    [CreatedByUserId] nvarchar(max) NULL,
    [CreatedByUserName] nvarchar(max) NULL,
    [CategoryId] uniqueidentifier NOT NULL,
    CONSTRAINT [PK_Product] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Product_ProductCategory_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [ProductCategory] ([Id]) ON DELETE CASCADE
);

GO

CREATE INDEX [IX_Product_CategoryId] ON [Product] ([CategoryId]);

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211031095726_InitialCreate', N'3.1.16');

GO

