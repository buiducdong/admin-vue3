import { reactive } from "vue";

interface DefaultPaginationData {
  total: number;
  currentPage: number;
  pageSizes: number[];
  pageSize: number;
  layout: string;
}

interface PaginationData {
  total?: number;
  currentPage?: number;
  pageSizes?: number[];
  pageSize?: number;
  layout?: string;
}

/** 默认的分页参数 */
const defaultPaginationData: DefaultPaginationData = {
  total: 0,
  currentPage: 1,
  pageSizes: [10, 20, 50],
  pageSize: 10,
  layout: "total, sizes, prev, pager, next, jumper",
};

export function usePagination(initialPaginationData: PaginationData = {}) {
  const paginationData = reactive({
    ...defaultPaginationData,
    ...initialPaginationData,
  });
  const handleCurrentChange = (value: number) => {
    paginationData.currentPage = value;
  };
  const handleSizeChange = (value: number) => {
    paginationData.pageSize = value;
  };

  return { paginationData, handleCurrentChange, handleSizeChange };
}
