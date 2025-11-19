using System.Text.RegularExpressions;

namespace Halos.Utilities
{
    /// <summary>
    /// A static class containing constant values used throughout the SelfHealth application. 
    /// </summary>
    public class Constants
    {
        public static class SelfHealth
        {
            public const string ServiceName = "SelfHealth";
            public const string ServiceVersion = "1.0.0";

        }

        /// <summary>
        /// Provides constants representing environment variable names used to configure access to various vault-related
        /// resources.
        /// </summary>
        /// <remarks>These constants are intended to be used as keys for retrieving environment variable
        /// values that specify URIs for blob storage and key vault resources.</remarks>
        public static class VaultEnvironment {

            /// <summary>
            /// Represents the environment variable name for the URI of the Blob Vault container.
            /// </summary>
            /// <remarks>This constant can be used to retrieve the Blob Vault container URI from
            /// environment variables. The value of this constant is "BLOB_VAULT_CONTAINER_URI".</remarks>
            public const string BlobVaultContainerUri = "BLOB_VAULT_CONTAINER_URI";
           
            /// <summary>
            /// Represents the URI key used to identify the location of blob storage keys.
            /// </summary>
            /// <remarks>This constant is typically used as a configuration key or identifier for accessing blob
            /// storage-related resources. Ensure that the corresponding value is properly configured in the application settings or
            /// environment variables.</remarks>
            public const string BlobKeysUri = "BLOB_KEYS_URI";

            /// <summary>
            /// Represents the configuration key for the URI of the Azure Key Vault.
            /// </summary>
            /// <remarks>This constant is typically used to retrieve the Key Vault URI from a
            /// configuration source, such as environment variables or application settings.</remarks>
            public const string KeyVaultUri = "KEYVAULT_URI";
        }

        /// <summary>
        /// Provides validation rules for vault names, ensuring they conform to a specific set of allowed characters.
        /// </summary>
        /// <remarks>Vault names must consist only of alphanumeric characters, underscores, periods, and
        /// hyphens. This rule ensures compatibility across different storage systems, such as file systems and blob
        /// storage.</remarks>
        internal static class VaultNameRules
        {
            // keep colon out so FileSystem and Blob behave the same
            public static readonly Regex Safe = new("^[A-Za-z0-9_.-]+$", RegexOptions.Compiled);
        }

        /// <summary>
        /// Provides a collection of constant strings representing the names of secrets used in the application.
        /// </summary>
        /// <remarks>These constants are typically used as keys to retrieve secret values from a
        /// configuration provider or a secret management system. Each constant represents a specific secret required by
        /// the application.</remarks>
        public static class SecretNames
        {

            /// <summary>
            /// Provides a collection of constants representing connection string keys for different SQL Server
            /// environments.
            /// </summary>
            /// <remarks>This class contains predefined string constants that represent the keys used
            /// to retrieve SQL Server connection strings  from a configuration source, such as environment variables or
            /// application settings. Each constant corresponds to a  specific environment or user context, such as
            /// development, staging, or production.</remarks>
            public static class SQLServer
            {

                /// <summary>
                /// Represents the Self Health® default SQL Server connection string key.
                /// </summary>
                public const string Default = "SqlServer__Default";

                /// <summary>
                /// Represents the Self Health® SQL Server connection string key for Jason's development environment.
                /// </summary>
                public const string JasonDev = "SqlServer__JasonDev";

                /// <summary>
                /// Represents the Self Health® SQL Server connection string key for Jason's staging environment.
                /// </summary>
                public const string JasonStage = "SqlServer__JasonStage";

                /// <summary>
                /// Represents the Self Health® SQL Server connection string key for Jason's production environment.
                /// </summary>
                public const string JasonProd = "SqlServer__JasonProd";

                /// <summary>
                /// Represents the Self Health® SQL Server connection string key for Mark's development environment.
                /// </summary>
                public const string MarkDev = "SqlServer__MarkDev";

                /// <summary>
                /// Represents the Self Health® SQL Server connection string key for Mark's staging environment.
                /// </summary>
                public const string MarkStage = "SqlServer__MarkStage";

                /// <summary>
                /// Represents the Self Health® SQL Server connection string key for Mark's production environment.
                /// </summary>
                public const string MarkProd = "SqlServer__MarkProd";
            }

            /// <summary>
            /// Provides constants related to the OpenAI API integration.
            /// </summary>
            /// <remarks>This class contains constants that can be used for configuring and
            /// interacting with the OpenAI API.</remarks>
            public static class OpenAI
            {
                public const string ApiKey = "OpenAI__ApiKey";
            }

        }

        /// <summary>
        /// Options for configuring vault-related resources, such as Blob container and Key Vault URIs.
        /// </summary>
        public sealed class VaultOptions
        {
            /// <summary>
            /// Gets or sets the URI of the Blob container used for vault storage.
            /// </summary>
            public string? BlobContainerUri { get; set; }

            /// <summary>
            /// Gets or sets the URI of the Azure Key Vault.
            /// </summary>
            public string? KeyVaultUri { get; set; }
        }

    }
}
