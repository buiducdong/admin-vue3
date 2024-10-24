<!-- eslint-disable vue/no-unused-vars -->
<!-- eslint-disable no-undef -->
<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import {
  type FormInstance,
  type FormRules,
  ElMessage,
  ElMessageBox,
} from "element-plus";
import {
  Search,
  Refresh,
  CirclePlus,
  Delete,
  Download,
  RefreshRight,
} from "@element-plus/icons-vue";
import { usePagination } from "@/hooks/usePagination";
import { cloneDeep } from "lodash-es";
import {
  CreateOrUpdateTableRequestData,
  TableData,
} from "@/api/table/types/table";

defineOptions({
  name: "ElementPlus",
});

const loading = ref<boolean>(false);
const { paginationData, handleCurrentChange, handleSizeChange } =
  usePagination();

const DEFAULT_FORM_DATA: CreateOrUpdateTableRequestData = {
  id: undefined,
  username: "",
  password: "",
};
const dialogVisible = ref<boolean>(false);
const formRef = ref<FormInstance | null>(null);
const formData = ref<CreateOrUpdateTableRequestData>(
  cloneDeep(DEFAULT_FORM_DATA)
);
const formRules: FormRules<CreateOrUpdateTableRequestData> = {
  username: [
    { required: true, trigger: "blur", message: "Please enter your username" },
  ],
  password: [
    { required: true, trigger: "blur", message: "Please enter your password" },
  ],
};

const resetForm = () => {
  formRef.value?.clearValidate();
  formData.value = cloneDeep(DEFAULT_FORM_DATA);
};
const tableData = ref<TableData[]>([]);
const searchFormRef = ref<FormInstance | null>(null);
const searchData = reactive({
  username: "",
  phone: "",
});
const getTableData = () => {
  loading.value = true;
  tableData.value = [
    {
      createTime: "1995-02-11 07:16:53",
      email: "l.mgmieiq@pyqzuae.sn",
      id: "820000198207104659",
      phone: "18604980364",
      roles: "admin",
      status: false,
      username: "Davis",
    },
    {
      createTime: "1995-02-11 07:16:53",
      email: "l.mgmieiq@pyqzuae.sn",
      id: "82000019820710465",
      phone: "186049803640",
      roles: "admin",
      status: false,
      username: "Davis",
    },
    {
      createTime: "1995-02-11 07:16:53",
      email: "l.mgmieiq@pyqzuae.sn",
      id: "820000198207104666",
      phone: "18604980364",
      roles: "admin",
      status: false,
      username: "Davis",
    },
    {
      createTime: "1995-02-11 07:16:53",
      email: "l.mgmieiq@pyqzuae.sn",
      id: "82000019820710465",
      phone: "186049803640",
      roles: "admin",
      status: false,
      username: "Davis",
    },
    {
      createTime: "1995-02-11 07:16:53",
      email: "l.mgmieiq@pyqzuae.sn",
      id: "820000198207104666",
      phone: "18604980364",
      roles: "admin",
      status: false,
      username: "Davis",
    },
    {
      createTime: "1995-02-11 07:16:53",
      email: "l.mgmieiq@pyqzuae.sn",
      id: "82000019820710465",
      phone: "186049803640",
      roles: "admin",
      status: false,
      username: "Davis",
    },
    {
      createTime: "1995-02-11 07:16:53",
      email: "l.mgmieiq@pyqzuae.sn",
      id: "820000198207104666",
      phone: "18604980364",
      roles: "admin",
      status: false,
      username: "Davis",
    },
    {
      createTime: "1995-02-11 07:16:53",
      email: "l.mgmieiq@pyqzuae.sn",
      id: "82000019820710465",
      phone: "186049803640",
      roles: "admin",
      status: false,
      username: "Davis",
    },
    {
      createTime: "1995-02-11 07:16:53",
      email: "l.mgmieiq@pyqzuae.sn",
      id: "820000198207104666",
      phone: "18604980364",
      roles: "admin",
      status: false,
      username: "Davis",
    },
    {
      createTime: "1995-02-11 07:16:53",
      email: "l.mgmieiq@pyqzuae.sn",
      id: "82000019820710465",
      phone: "186049803640",
      roles: "admin",
      status: false,
      username: "Davis",
    },
    {
      createTime: "1995-02-11 07:16:53",
      email: "l.mgmieiq@pyqzuae.sn",
      id: "820000198207104666",
      phone: "18604980364",
      roles: "admin",
      status: false,
      username: "Davis",
    },
    {
      createTime: "1995-02-11 07:16:53",
      email: "l.mgmieiq@pyqzuae.sn",
      id: "82000019820710465",
      phone: "186049803640",
      roles: "admin",
      status: false,
      username: "Davis",
    },
    {
      createTime: "1995-02-11 07:16:53",
      email: "l.mgmieiq@pyqzuae.sn",
      id: "820000198207104666",
      phone: "18604980364",
      roles: "admin",
      status: false,
      username: "Davis",
    },
    {
      createTime: "1995-02-11 07:16:53",
      email: "l.mgmieiq@pyqzuae.sn",
      id: "82000019820710465",
      phone: "186049803640",
      roles: "admin",
      status: false,
      username: "Davis",
    },
    {
      createTime: "1995-02-11 07:16:53",
      email: "l.mgmieiq@pyqzuae.sn",
      id: "820000198207104666",
      phone: "18604980364",
      roles: "admin",
      status: false,
      username: "Davis",
    },
    {
      createTime: "1995-02-11 07:16:53",
      email: "l.mgmieiq@pyqzuae.sn",
      id: "82000019820710465",
      phone: "186049803640",
      roles: "admin",
      status: false,
      username: "Davis",
    },
    {
      createTime: "1995-02-11 07:16:53",
      email: "l.mgmieiq@pyqzuae.sn",
      id: "820000198207104666",
      phone: "18604980364",
      roles: "admin",
      status: false,
      username: "Davis",
    },
    {
      createTime: "1995-02-11 07:16:53",
      email: "l.mgmieiq@pyqzuae.sn",
      id: "82000019820710465",
      phone: "186049803640",
      roles: "admin",
      status: false,
      username: "Davis",
    },
    {
      createTime: "1995-02-11 07:16:53",
      email: "l.mgmieiq@pyqzuae.sn",
      id: "820000198207104666",
      phone: "18604980364",
      roles: "admin",
      status: false,
      username: "Davis",
    },
    {
      createTime: "1995-02-11 07:16:53",
      email: "l.mgmieiq@pyqzuae.sn",
      id: "82000019820710465",
      phone: "186049803640",
      roles: "admin",
      status: false,
      username: "Davis",
    },
    {
      createTime: "1995-02-11 07:16:53",
      email: "l.mgmieiq@pyqzuae.sn",
      id: "820000198207104666",
      phone: "18604980364",
      roles: "admin",
      status: false,
      username: "Davis",
    },
  ];
  paginationData.total = tableData.value.length;
  loading.value = false;
};
const handleSearch = () => {
  paginationData.currentPage === 1
    ? getTableData()
    : (paginationData.currentPage = 1);
};
const resetSearch = () => {
  searchFormRef.value?.resetFields();
  handleSearch();
};

watch(
  [() => paginationData.currentPage, () => paginationData.pageSize],
  getTableData,
  { immediate: true }
);
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="username" label="Username">
          <el-input v-model="searchData.username" placeholder="Please enter" />
        </el-form-item>
        <el-form-item prop="phone" label="Phone number">
          <el-input v-model="searchData.phone" placeholder="Please enter" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch"
            >Search</el-button
          >
          <el-button :icon="Refresh" @click="resetSearch">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button
            type="primary"
            :icon="CirclePlus"
            @click="dialogVisible = true"
            >Add new user</el-button
          >
          <el-button type="danger" :icon="Delete">Deletion</el-button>
        </div>
        <div>
          <el-tooltip content="download">
            <el-button type="primary" :icon="Download" circle />
          </el-tooltip>
          <el-tooltip content="Refresh the current page">
            <el-button
              type="primary"
              :icon="RefreshRight"
              circle
              @click="getTableData"
            />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData" style="height: 600px">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="username" label="Name" align="center" />
          <el-table-column prop="roles" label="Role" align="center">
            <template #default="scope">
              <el-tag
                v-if="scope.row.roles === 'admin'"
                type="primary"
                effect="plain"
                >admin</el-tag
              >
              <el-tag v-else type="warning" effect="plain">{{
                scope.row.roles
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="Phone" align="center" />
          <el-table-column prop="email" label="Email" align="center" />
          <el-table-column prop="status" label="Status" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.status" type="success" effect="plain"
                >Enable</el-tag
              >
              <el-tag v-else type="danger" effect="plain">Disable</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="Create Date"
            align="center"
          />
          <el-table-column
            fixed="right"
            label="operate"
            width="150"
            align="center"
          >
            <template>
              <el-button type="primary" text bg size="small">Edit</el-button>
              <el-button type="danger" text bg size="small">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager-wrapper">
        <el-pagination
          background
          :layout="paginationData.layout"
          :page-sizes="paginationData.pageSizes"
          :total="paginationData.total"
          :page-size="paginationData.pageSize"
          :currentPage="paginationData.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
