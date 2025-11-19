// PSEUDOCODE / PLAN:
// 1. Build a helper to get the DisplayAttribute Name for a WorkflowStates enum member.
//    - Use reflection to read DisplayAttribute on each member.
//    - Provide a GetDisplayName(this WorkflowStates) extension method.
//    - Cache results in a static dictionary for performance.
// 2. Implement a System.Text.Json.JsonConverter<WorkflowStates>:
//    - On Write: write the Display name (fallback to enum name) as a JSON string.
//    - On Read: accept
//        a) a string that equals a Display name (case-insensitive) -> map to enum value
//        b) a string that equals the enum name (case-insensitive) -> parse to enum
//        c) a numeric token -> cast to enum (validate defined value)
//        d) a string containing an integer -> parse and cast
//      - If no mapping is found, throw JsonException.
//    - Use cached dictionaries for mapping displayName -> enum and enum -> displayName.
// 3. Provide an extension method to register the converter on a JsonSerializerOptions instance.
// 4. Usage:
//    var opts = new JsonSerializerOptions();
//    opts.AddWorkflowStatesDisplayNameConverter();
//    JsonSerializer.Serialize(WorkflowStates.IN_PROGRESS, opts); // "In Progress"
//
// Implementation follows:

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Halos.Extensions
{
    /// <summary>
    /// Provides extension methods for the <see cref="WorkflowStates"/> enumeration, enabling functionality such as
    /// retrieving display names and parsing from display names.
    /// </summary>
    /// <remarks>This class includes methods to map between <see cref="WorkflowStates"/> values and their
    /// corresponding display names, as defined by the <see cref="DisplayAttribute"/> applied to the enumeration
    /// members. It also supports case-insensitive lookup and parsing of display names back to their corresponding
    /// enumeration values.</remarks>
    public static class WorkflowStatesExtensions
    {
        private static readonly Dictionary<WorkflowStates, string> _displayCache;
        private static readonly Dictionary<string, WorkflowStates> _reverseCache;
        private static readonly object _initLock = new();

        /// <summary>
        /// Initializes static caches for mapping between <see cref="WorkflowStates"/> and their string representations.
        /// </summary>
        /// <remarks>This static constructor initializes two internal dictionaries: one for mapping <see
        /// cref="WorkflowStates"/> to their corresponding string representations, and another for reverse mapping
        /// strings to <see cref="WorkflowStates"/> values. The mappings are case-insensitive for string keys.</remarks>
        static WorkflowStatesExtensions()
        {
            _displayCache = new Dictionary<WorkflowStates, string>();
            _reverseCache = new Dictionary<string, WorkflowStates>(StringComparer.OrdinalIgnoreCase);
            InitializeCaches();
        }

        /// <summary>
        /// Initializes the caches used for mapping workflow states to their display names and vice versa.
        /// </summary>
        /// <remarks>This method populates two internal caches: one for mapping each <see
        /// cref="WorkflowStates"> enumeration value to its corresponding display name, and another for reverse mapping
        /// display names (case-insensitively) back to their respective enumeration values. If duplicate display names
        /// exist, the last one processed will overwrite previous entries in the reverse cache.</remarks>
        private static void InitializeCaches()
        {
            foreach (WorkflowStates value in Enum.GetValues(typeof(WorkflowStates)))
            {
                string name = value.ToString();
                var member = typeof(WorkflowStates).GetMember(name);
                string display = name;

                if (member.Length > 0)
                {
                    var displayAttr = member[0].GetCustomAttribute<DisplayAttribute>();
                    if (displayAttr != null && !string.IsNullOrWhiteSpace(displayAttr.Name))
                    {
                        display = displayAttr.Name;
                    }
                }

                _displayCache[value] = display;
                // if duplicate display names exist, last one wins; comparison is case-insensitive for lookup
                _reverseCache[display] = value;
            }
        }

        /// <summary>
        /// Retrieves the display name associated with the specified <see cref="WorkflowStates"/> value.
        /// </summary>
        /// <remarks>This method uses a cached lookup to retrieve the display name. If the cache is
        /// uninitialized, it will be initialized on demand. This ensures that the method is thread-safe and avoids
        /// unnecessary reinitialization.</remarks>
        /// <param name="state">The <see cref="WorkflowStates"/> value for which to retrieve the display name.</param>
        /// <returns>The display name corresponding to the specified <paramref name="state"/> if it exists; otherwise, the string
        /// representation of the <paramref name="state"/>.</returns>
        public static string GetDisplayName(this WorkflowStates state)
        {
            if (_displayCache.TryGetValue(state, out var display))
                return display;
            // Fallback: ensure initialization and attempt again (shouldn't normally be needed)
            lock (_initLock)
            {
                if (_displayCache.Count == 0)
                    InitializeCaches();
            }
            return _displayCache.TryGetValue(state, out display) ? display : state.ToString();
        }

        /// <summary>
        /// Attempts to convert the specified display name to a corresponding <see cref="WorkflowStates"/> value.
        /// </summary>
        /// <remarks>This method performs the conversion in the following order: <list type="number">
        /// <item><description>Checks for an exact case-insensitive match in the display name
        /// mapping.</description></item> <item><description>Attempts to parse the input as an enum
        /// name.</description></item> <item><description>Attempts to parse the input as a numeric value and map it to a
        /// defined <see cref="WorkflowStates"/> value.</description></item> </list> If none of these conversions
        /// succeed, the method returns <see langword="false"/> and sets <paramref name="value"/> to the default value
        /// of <see cref="WorkflowStates"/>.</remarks>
        /// <param name="text">The display name or string representation to convert. This can be a case-insensitive display name, an enum
        /// name, or a numeric value.</param>
        /// <param name="value">When this method returns, contains the <see cref="WorkflowStates"/> value that corresponds to the specified
        /// display name, if the conversion succeeded; otherwise, the default value of <see cref="WorkflowStates"/>.</param>
        /// <returns><see langword="true"/> if the conversion succeeded; otherwise, <see langword="false"/>.</returns>
        internal static bool TryFromDisplayName(string text, out WorkflowStates value)
        {
            if (string.IsNullOrEmpty(text))
            {
                value = default;
                return false;
            }

            // Try exact display mapping (case-insensitive)
            if (_reverseCache.TryGetValue(text, out value))
                return true;

            // Try parse by enum name
            if (Enum.TryParse<WorkflowStates>(text, true, out value))
                return true;

            // Try numeric string
            if (int.TryParse(text, out var numeric))
            {
                var candidate = (WorkflowStates)numeric;
                if (Enum.IsDefined(typeof(WorkflowStates), candidate))
                {
                    value = candidate;
                    return true;
                }
            }

            value = default;
            return false;
        }
    }

    /// <summary>
    /// Provides custom JSON serialization and deserialization for the <see cref="WorkflowStates"/> enumeration.
    /// </summary>
    /// <remarks>This converter supports both string and numeric representations of <see
    /// cref="WorkflowStates"/> during deserialization. String values are matched against the display names of the
    /// enumeration, while numeric values are matched against the underlying integer values of the enumeration. During
    /// serialization, the display name of the <see cref="WorkflowStates"/> value is written as a string.</remarks>
    public sealed class WorkflowStatesJsonConverter : JsonConverter<WorkflowStates>
    {
        public override WorkflowStates Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            // Accept string and number tokens
            if (reader.TokenType == JsonTokenType.String)
            {
                var text = reader.GetString();
                if (WorkflowStatesExtensions.TryFromDisplayName(text, out var result))
                    return result;

                throw new JsonException($"Cannot convert '{text}' to {nameof(WorkflowStates)}.");
            }

            if (reader.TokenType == JsonTokenType.Number)
            {
                if (reader.TryGetInt32(out int intVal))
                {
                    var candidate = (WorkflowStates)intVal;
                    if (Enum.IsDefined(typeof(WorkflowStates), candidate))
                        return candidate;
                    throw new JsonException($"Numeric value {intVal} is not defined for {nameof(WorkflowStates)}.");
                }

                throw new JsonException($"Unsupported numeric value for {nameof(WorkflowStates)}.");
            }

            throw new JsonException($"Unexpected token {reader.TokenType} when parsing {nameof(WorkflowStates)}.");
        }

        public override void Write(Utf8JsonWriter writer, WorkflowStates value, JsonSerializerOptions options)
        {
            var display = value.GetDisplayName();
            writer.WriteStringValue(display);
        }
    }

    /// <summary>
    /// Provides extension methods for configuring <see cref="JsonSerializerOptions"/> instances.
    /// </summary>
    public static class JsonSerializerOptionsExtensions
    {
        public static void AddWorkflowStatesDisplayNameConverter(this JsonSerializerOptions options)
        {
            if (options == null) throw new ArgumentNullException(nameof(options));
            // Register converter for WorkflowStates (System.Text.Json will use this for nullable WorkflowStates as well)
            options.Converters.Add(new WorkflowStatesJsonConverter());
        }
    }
}