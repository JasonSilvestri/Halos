namespace SelfHealth.Common;
public static class StringEx
{
    public static bool IsBlank(this string? s) => string.IsNullOrWhiteSpace(s);
}
