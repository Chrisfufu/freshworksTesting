import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import connect from 'redux-connect-decorator'
import { Table, Input, Button } from 'antd';
import { Space } from 'antd';
import AppLayout from '../../layout';
import { fetchKeys } from '../../actions/infoActions'
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const { Column, ColumnGroup } = Table;
// connect to store.
@connect((store) => {
  return {
    allInfo: store.info.allInfo,
  };
})
// this is the first tab
// it is a form by using Ant Design.
// this tab creates a feeding information object once at a time
// by clicking the submit button.
// shows success popup window when successfully upload the information.
class Info extends React.Component {
  // these are state in the class
  state = {
    visible: false,
    startTime: null,
    endTime: null,
    searchText: '',
    searchedColumn: '',
  };


  // react lifecycle, this is to fetch all the foods in the database,
  // then it can display all food in the selection options.
  componentDidMount(){
    this.props.dispatch(fetchKeys())
  }

  // react lifecycle, when finished uploading the information of feeding the ducks,
  // then showModal
  UNSAFE_componentWillReceiveProps(nextProps) {
    if(this.props.info !== nextProps.info &&
      nextProps.info !== undefined)
      {
        this.showModal()
      }
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      sortedInfo: sorter,
    });
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  handleRefresh = () => {
    // this.formRef.current.resetFields();
  };

  render() {
    var data = [];

    for (var i = 0; i<this.props.allInfo.length; i++){
      let obj = {};
      obj.key = this.props.allInfo[i].keyId;  // event id
      obj.name = this.props.allInfo[i].name;
      obj.description = this.props.allInfo[i].description;
      obj.expiryTime = this.props.allInfo[i].expiryTime.substring(0,10);
      obj.keys = this.props.allInfo[i].key;

      data.push(obj);
    }
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    const stringSorter = (a, b, key) => a[key].toString().localeCompare(b[key].toString());
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        ...this.getColumnSearchProps('name'),
        sorter: (a, b) => stringSorter(a, b, 'name'),
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        ...this.getColumnSearchProps('description'),
        sorter: (a, b) => stringSorter(a, b, 'description'),
        sortOrder: sortedInfo.columnKey === 'description' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Expiry Time',
        dataIndex: 'expiryTime',
        key: 'expiryTime',
        ...this.getColumnSearchProps('expiryTime'),
        sorter: (a, b) => stringSorter(a, b, 'expiryTime'),
        sortOrder: sortedInfo.columnKey === 'expiryTime' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Keys',
        dataIndex: 'keys',
        key: 'keys',
        ...this.getColumnSearchProps('keys'),
        sorter: (a, b) => a.keys - b.keys,
        sortOrder: sortedInfo.columnKey === 'keys' && sortedInfo.order,
        ellipsis: true,
      }
    ];
    return (

      <AppLayout style={{overflow: "auto"}}>
      {/* AppLayout, includes header, navigation bar, content, footer */}
          {/*
            create a form
          */}
        <div>
          <br></br>
          <Table columns={columns} dataSource={data}  onChange={this.handleChange}>
          
          </Table>
        </div>
      </AppLayout>
    );
  }
}

export default Info;
