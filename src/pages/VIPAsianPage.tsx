@@ .. @@
import { useTheme } from "../contexts/ThemeContext";
import MonthFilter from "../components/MonthFilter";
import CategoryFilter from "../components/CategoryFilter";
+import { DateRangeFilter, DateFilterValue } from "../components/DateRangeFilter";
@@ .. @@
   const [searchLoading, setSearchLoading] = useState(false);
   const [totalPages, setTotalPages] = useState(1);
-  const [dateFilter, setDateFilter] = useState("all");
+  const [dateFilter, setDateFilter] = useState<DateFilterValue>("all");
@@ .. @@
       if (searchName) params.append("search", searchName);
       if (selectedCategory) params.append("category", selectedCategory);
       if (selectedMonth) params.append("month", selectedMonth);
-      if (dateFilter !== "all") params.append("dateFilter", dateFilter);
+      
+      // Enviar filtro de data para o backend
+      if (dateFilter !== 'all') {
+        params.append('dateFilter', dateFilter);
+      }
@@ .. @@
             {/* Filter Buttons */}
             <div className="flex items-center gap-2">
-              {["all", "today", "yesterday", "7days"].map((filter) => (
-                <button
-                  key={filter}
-                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 border whitespace-nowrap ${
-                    dateFilter === filter
-                      ? isDark
-                        ? "bg-yellow-500 text-black border-yellow-400 shadow-lg shadow-yellow-500/30"
-                        : "bg-yellow-600 text-white border-yellow-500 shadow-lg shadow-yellow-500/20"
-                      : isDark
-                      ? "bg-gray-700/50 text-gray-300 hover:bg-yellow-500/20 border-gray-600/50 hover:text-yellow-300"
-                      : "bg-gray-200/50 text-gray-700 hover:bg-yellow-100 border-gray-300/50 hover:text-yellow-700"
-                  }`}
-                  onClick={() => setDateFilter(filter)}
-                >
-                  {filter === "all"
-                    ? "All"
-                    : filter === "7days"
-                    ? "7 Days"
-                    : filter.charAt(0).toUpperCase() + filter.slice(1)}
-                </button>
-              ))}
+              <DateRangeFilter 
+                value={dateFilter} 
+                onChange={setDateFilter} 
+                themeColor="yellow" 
+              />

               <div className="month-filter-container">
                 <MonthFilter
                 selectedMonth={selectedMonth}
                 onMonthChange={setSelectedMonth}
                 themeColor="yellow"
                 />
               </div>
             </div>