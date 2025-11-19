using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System;

namespace Halos.Shared
{
    internal static class EnumDisplayNameExtensions
    {

        internal static string GetDisplayName(this WorkflowStates state)
        {
            var mem = state.GetType().GetMember(state.ToString());
            if (mem.Length == 0) return state.ToString();
            var attr = mem[0].GetCustomAttribute<DisplayAttribute>();
            return attr?.GetName() ?? state.ToString();
        }

        //Usage: 
        // returns "In Progress"
        //var label = WorkflowStates.IN_PROGRESS.GetDisplayName();
    }
}
