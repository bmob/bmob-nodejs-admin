<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.pageviews}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.display_time}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          id: '140000198609091115',
          title:
            'Aoyxpji yttqm wsbpftj iivoji jdio csktpbr wvwowjjzb ibsvgkmc qctswy rdhknvwso dpqpy tyoeckwb phgc qfokydnpo nhjaif tpqowy sfftchcj.',
          status: 'deleted',
          author: 'name',
          display_time: '2011-11-28 02:04:48',
          pageviews: 4824
        },
        {
          id: '430000200804296633',
          title:
            'Avdnxi mqcmyz ydmlm aicqqsbgn lhzc wmvrl cpfrx lxzzvfkib vgqptk qfjfbwc dmnndl tcpkwfbg lqkix mqbtt dvgbh.',
          status: 'published',
          author: 'name',
          display_time: '2003-11-04 04:14:08',
          pageviews: 1642
        },
        {
          id: '450000197410087387',
          title:
            'Drhiw vqci dhimqqhq hnobz xvmid jhvhzsde igz ebalneb qajxrhl xiixze flojuvmpd.',
          status: 'deleted',
          author: 'name',
          display_time: '1990-07-18 10:52:20',
          pageviews: 3849
        },
        {
          id: '310000199004107619',
          title:
            'Wvh ajigep uruvm ctthnewit sompfheld fnhltmeh dxg bdtegup notosw cgoybbbc pgtr ree eptu gwiswmu potrlt fcvzc vjk.',
          status: 'draft',
          author: 'name',
          display_time: '2007-03-04 09:56:34',
          pageviews: 968
        },
        {
          id: '640000200503120422',
          title:
            'Fdr ivot povlwlaf tdeiagdvg cxrhc polcsijhx epkgjzwg rpwtzd orspn qcctvkek ehiu wvrvd qip uzhgonfrq nljnreq.',
          status: 'deleted',
          author: 'name',
          display_time: '1973-10-17 04:25:09',
          pageviews: 797
        }
      ],
      listLoading: true
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = false
      // getList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
    }
  }
}
</script>