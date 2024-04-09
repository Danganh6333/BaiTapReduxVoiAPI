import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {
  addChiTieuApi,
  deleteChiTieuApi,
  fetchChiTieuApi,
  searchChiTieuApi,
  updateChiTieuApi,
} from '../redux/actions/chiTieuAction';
import {RadioButton} from 'react-native-paper';
import ActionBtn from '../../ActionBtn';
import {useDispatch, useSelector} from 'react-redux';
import SearchBar from '../../SearchBar';

const QuanLyChiTieu = () => {
  const [tieuDe, setTieuDe] = useState('');
  const [moTa, setMoTa] = useState('');
  const [ngayThuChi, setNgayThuChi] = useState('');
  const [loaiThuChi, setLoaiThuChi] = useState('');
  const [soTien, setSoTien] = useState('');
  const [editTieuDe, setEditTieuDe] = useState('');
  const [editMoTa, setEditMoTa] = useState('');
  const [editNgayThuChi, setEditNgayThuChi] = useState('');
  const [editLoaiThuChi, setEditLoaiThuChi] = useState('');
  const [editSoTien, setEditSoTien] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editItemId, setEditItemId] = useState('');
  const [searchTieuDe, setSearchTieuDe] = useState('');
  const [checked, setChecked] = useState('Chi');
  const [totalThu, setTotalThu] = useState(0);
  const [totalChi, setTotalChi] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const listChiTieu = useSelector(state => state.listChiTieu.listChiTieu);
  useEffect(() => {
    dispatch(fetchChiTieuApi());
  }, [dispatch]);
  const handleAddChiTieu = () => {
    let duLieuThem = {
      id: Math.random().toString(),
      tieuDe: tieuDe,
      moTa: moTa,
      ngayThuChi: ngayThuChi,
      loaiThuChi: loaiThuChi,
      soTien: soTien,
    };
    dispatch(addChiTieuApi(duLieuThem))
      .then(result => {
        console.log('Thêm chi tiêu ');
      })
      .catch(error => {
        console.log('Lối thêm chi tiêu', error);
      });
  };
  const calculateTotal = () => {
    let thu = 0;
    let chi = 0;
    listChiTieu.forEach(item => {
      if (item.loaiThuChi === 'Thu') {
        thu += parseFloat(item.soTien);
      } else {
        chi += parseFloat(item.soTien);
      }
    });
    setTotalThu(thu);
    setTotalChi(chi);
  };
  useEffect(() => {
    calculateTotal();
  }, [listChiTieu]);
  const handleDeleteChiTieu = async id => {
    dispatch(deleteChiTieuApi(id))
      .then(result => {
        console.log('Xóa thu chi thành công');
      })
      .catch(erroe => {
        console.log('Xóa thu chi thất bại', error);
      });
  };
  const handleSearchQueryChange = query => {
    setSearchTieuDe(query);
  };
  const handleSearch = () => {
    dispatch(searchChiTieuApi(searchTieuDe));
  };
  const handleSaveUpdate = () => {
    let updatedData = {
      id: editItemId,
      tieuDe: editTieuDe,
      moTa: editMoTa,
      ngayThuChi: editNgayThuChi,
      loaiThuChi: editLoaiThuChi,
      soTien: editSoTien,
    };
    console.log(updatedData);
    dispatch(updateChiTieuApi({id: editItemId, data: updatedData}))
      .then(result => {
        console.log('Update Chi Tiêu thành công');
        setIsModalVisible(false);
        setIsEditing(false);
        setEditTieuDe('');
        setEditMoTa('');
        setEditNgayThuChi('');
        setEditLoaiThuChi('');
        setEditSoTien('');
        setEditItemId('');
      })
      .catch(error => {
        console.log('Lỗi cập nhật chi tiêu', error);
      });
  };

  const handleUpdateChiTieu = item => {
    setIsModalVisible(true);
    setEditItemId(item.id);
    setEditTieuDe(item.tieuDe);
    setEditMoTa(item.moTa);
    setEditNgayThuChi(item.ngayThuChi);
    setEditLoaiThuChi(item.loaiThuChi);
    setEditSoTien(item.soTien);
    setIsEditing(true);
  };

  const filteredListChiTieu = useMemo(() => {
    return listChiTieu.filter(item =>
      item.tieuDe.toLowerCase().includes(searchTieuDe.toLowerCase()),
    );
  }, [listChiTieu, searchTieuDe]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Tìm Kiếm Tiêu Đề"
            onChangeText={handleSearchQueryChange}
            onSubmitEditing={() => handleSearch()}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Nhập tiêu đề"
            onChangeText={txt => setTieuDe(txt)}
            style={styles.input}
          />
          <TextInput
            placeholder="Nhập mô tả"
            onChangeText={txt => setMoTa(txt)}
            style={styles.input}
          />
          <TextInput
            placeholder="Nhập ngày thu chi"
            onChangeText={txt => setNgayThuChi(txt)}
            style={styles.input}
          />
          <View style={styles.radioContainer}>
            <Text>Loại thu chi:</Text>
            <RadioButton.Group
              onValueChange={newValue => setLoaiThuChi(newValue)}
              value={loaiThuChi}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginStart: 23,
                }}>
                <View style={styles.radioOption}>
                  <Text>Chi</Text>
                  <RadioButton value="Chi" />
                </View>
                <View style={styles.radioOption}>
                  <Text>Thu</Text>
                  <RadioButton value="Thu" />
                </View>
              </View>
            </RadioButton.Group>
          </View>
          <TextInput
            placeholder="Nhập số tiền"
            onChangeText={txt => setSoTien(txt)}
            style={styles.input}
            keyboardType="numeric"
          />
          <ActionBtn title="Thêm" onPress={handleAddChiTieu} />
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Tổng số tiền thu: {totalThu}</Text>
          <Text style={styles.totalText}>Tổng số tiền chi: {totalChi}</Text>
        </View>
        <View style={styles.listContainer}>
          {filteredListChiTieu.map(row => (
            <View
              key={`${row.tieuDe}-${row.moTa}-${row.ngayThuChi}-${row.loaiThuChi}-${row.soTien}`}
              style={styles.itemContainer}>
              <Text style={styles.itemTitle}>{row.tieuDe}</Text>
              <Text style={styles.itemDetail}>Mô tả: {row.moTa}</Text>
              <Text style={styles.itemDetail}>
                Ngày thu chi: {row.ngayThuChi}
              </Text>
              <Text style={styles.itemDetail}>
                Loại thu chi: {row.loaiThuChi}
              </Text>
              <Text style={styles.itemDetail}>Số tiền: {row.soTien}</Text>
              <View style={styles.itemPro}>
                <TouchableOpacity
                  style={[styles.button, styles.deleteButton]}
                  onPress={() => handleDeleteChiTieu(row.id)}>
                  <Text style={styles.buttonText}>Xóa</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleUpdateChiTieu(row)}
                  style={[styles.button, styles.editButton]}>
                  <Text style={styles.buttonText}>Chỉnh Sửa</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chỉnh Sửa Chi Tiêu</Text>
            <TextInput
              value={editTieuDe}
              onChangeText={setEditTieuDe}
              style={styles.input}
              placeholder="Tiêu đề"
            />
            <TextInput
              value={editMoTa}
              onChangeText={setEditMoTa}
              style={styles.input}
              placeholder="Mô tả"
            />
            <TextInput
              value={editNgayThuChi}
              onChangeText={setEditNgayThuChi}
              style={styles.input}
              placeholder="Ngày thu chi"
            />
            <View style={styles.radioContainer}>
              <Text style={styles.radioLabel}>Loại thu chi:</Text>
              <RadioButton.Group
                onValueChange={newValue => setEditLoaiThuChi(newValue)}
                value={editLoaiThuChi}>
                <View style={styles.radioOption}>
                  <Text>Chi</Text>
                  <RadioButton value="Chi" />
                </View>
                <View style={styles.radioOption}>
                  <Text>Thu</Text>
                  <RadioButton value="Thu" />
                </View>
              </RadioButton.Group>
            </View>
            <TextInput
              value={editSoTien}
              onChangeText={setEditSoTien}
              style={styles.input}
              placeholder="Số tiền"
              keyboardType="numeric"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}>
                <Text style={styles.buttonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSaveUpdate}>
                <Text style={styles.buttonText}>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default QuanLyChiTieu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'papayawhip',
    paddingHorizontal: 24,
    paddingTop: 11,
    paddingBottom: 11,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#ECEFF1',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    width: '100%',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  listContainer: {
    marginTop: 20,
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDetail: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemPro: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#005b96',
    borderRadius: 8,
    elevation: 3,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: '23%',
  },
  modalContent: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  radioLabel: {
    marginRight: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',

    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#aaa',
  },
  saveButton: {
    backgroundColor: '#007bff',
  },
});
