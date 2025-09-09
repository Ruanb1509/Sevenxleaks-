@@ .. @@
import LoadingBanned from "../components/Loaders/LoadingBanned";
import MonthFilter from "../components/MonthFilter";
import SortFilter, { SortValue } from "../components/SortFilter";
+import { DateRangeFilter, DateFilterValue } from "../components/DateRangeFilter";
@@ .. @@
   const [searchName, setSearchName] = useState<string>("");
   const [selectedMonth, setSelectedMonth] = useState<string>("");
   const [sortOption, setSortOption] = useState<SortValue>("mostRecent");
+  const [dateFilter, setDateFilter] = useState<DateFilterValue>("all");
   const [loading, setLoading] = useState(true);
@@ .. @@
       if (searchName) params.append('search', searchName);
       if (selectedMonth) params.append('month', selectedMonth);
+      
+      // Enviar filtro de data para o backend
+      if (dateFilter !== 'all') {
+        params.append('dateFilter', dateFilter);
+      }
@@ .. @@
     return () => clearTimeout(timer);
     // eslint-disable-next-line react-hooks/exhaustive-deps
-  }, [searchName, selectedMonth, sortOption]);
+  }, [searchName, selectedMonth, sortOption, dateFilter]);
@@ .. @@
              {/* Filters */}
               <div className="flex items-center gap-2">
+                <DateRangeFilter 
+                  value={dateFilter} 
+                  onChange={setDateFilter} 
+                  themeColor="red" 
+                />
+                
                 <div className="month-filter-container relative z-50">
                   <MonthFilter
                     selectedMonth={selectedMonth}
                     onMonthChange={setSelectedMonth}
                     themeColor="red"
                   />
                 </div>

                 <SortFilter selected={sortOption} onChange={setSortOption} themeColor="red" />
               </div>