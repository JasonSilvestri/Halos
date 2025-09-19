namespace Halos.Shared
{

        public enum WorkflowStates
        {
            CREATED = 1,
            QUEUED = 2,
            IN_PROGRESS = 3,
            WAITING = 4,
            PASSED = 5,
            FAILED = 6,
            REJECTED = 7,
            CANCELLED = 8,
            SKIPPED = 9,
            TIMEOUT = 10,
            NETWORK_ERROR = 11,
            VALIDATION_ERROR = 12,
            RETRYING = 13,
            BLOCKED = 14
        }
}
