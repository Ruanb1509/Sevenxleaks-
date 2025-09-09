@@ .. @@
import MonthFilter from "../components/MonthFilter";
import CategoryFilter from "../components/CategoryFilter";
-import { DateRangeFilter, applyDateFilter, DateFilterValue } from "../components/DateRangeFilter";
+import { DateRangeFilter, DateFilterValue } from "../components/DateRangeFilter";
@@ .. @@
   const [dateFilter, setDateFilter] = useState<DateFilterValue>("all");
   const [loading, setLoading] = useState(true);
@@ .. @@
       if (searchName) params.append('search', searchName);
       if (selectedCategory) params.append('category', selectedCategory);
       if (selectedMonth) params.append('month', selectedMonth);
-      if (dateFilter !== 'all') params.append('dateFilter', dateFilter);
+      
+      // Enviar filtro de data para o backend
+      if (dateFilter !== 'all') {
+        params.append('dateFilter', dateFilter);
+      }
@@ .. @@
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [searchName, selectedCategory, dateFilter, selectedMonth]);

-useEffect(() => {
-  setFilteredLinks(applyDateFilter(links, dateFilter));
-}, [links, dateFilter]);
-
   const handleLoadMore = () => {
@@ .. @@
             {/* Filter Buttons */}
             <div className="flex items-center gap-2">
-              <DateRangeFilter value={dateFilter} onChange={setDateFilter} isDark={isDark} />
+              <DateRangeFilter 
+                value={dateFilter} 
+                onChange={setDateFilter} 
+                themeColor="purple" 
+              />
             </div>