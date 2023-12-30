import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';

const ListHome = () => {
  const newsList = [
    {
      id: "1",
      title: "Cấm tuyệt đối nồng độ cồn khi lái xe để thống nhất pháp luật",
      content: "Theo trung tướng Nguyễn Minh Đức, việc cấm tuyệt đối nồng độ cồn khi lái xe cần tiếp tục quy định trong luật mới, đảm bảo thống nhất với Luật Phòng",
      category: "Thời Sự",
      date: "29/11/2023",
      imageUrl: "../app/assets/anhBao1.png",
    },
    {
      id: "2",
      title: "Khoảnh khắc vỡ òa khi Ấn Độ cứu 41 công nhân kẹt trong hầm",
      content: "Nhóm 41 công nhân Ấn Độ sợ hãi, hoảng loạn và tuyệt vọng khi hàng tấn đá chặn lối thoát duy nhất của họ trong hầm đường bộ ở Uttarakhand",
      category: "Thời Sự",
      date: "10/11/2023",
      imageUrl: "../../assets/anhBao2.png",
    },
    {
      id: "3",
      title: "Đề nghị thẩm định nguồn gốc 'xá lợi tóc Đức Phật' trưng bày tại chùa Ba Vàng",
      content: "Ban Tôn giáo Chính phủ đã trao đổi và có văn bản gửi Giáo hội Phật giáo Việt Nam đề nghị thẩm định nguồn gốc “xá lợi tóc Đức Phật” được trưng bày tại chùa Ba Vàng trong những ngày qua để có thông tin chính thức về sự việc",
      category: "Thời Sự",
      date: "30/12/2023",
      imageUrl: "../../assets/anhBao3.png",
    },
    {
      id: "4",
      title: "Nga nói kế hoạch tác chiến của Ukraine thất bại hoàn toàn, đánh chặn 32 UAV",
      content: "Quan chức Nga cho rằng kế hoạch tác chiến của Ukraine đã thất bại hoàn toàn. Lực lượng Nga đánh chặn 32 UAV và 13 quả tên lửa của Ukraine",
      category: "Thời Sự",
      date: "30/12/2023",
      imageUrl: "../../assets/anhBao4.jpg",
    },
    {
      id: "5",
      title: "Hàng loạt đại học công ở TP.HCM trống ghế hiệu trưởng",
      content: "Nhiều trường đại học ở TP.HCM hiện trống ghế hiệu trưởng như Trường ĐH Quốc tế, Trường ĐH Công nghiệp, Trường ĐH Công Thương, Trường ĐH Y Dược, Trường ĐH Nông lâm do người kế nhiệm đã hết nhiệm kỳ, chuyển vị trí khác",
      category: "Giáo Dục",
      date: "29/12/2023",
      imageUrl: "../../assets/anhBao5.jpg",
    },
    {
      id: "6",
      title: "Chuỗi hoạt động du lịch hấp dẫn ở TP.HCM chào đón năm mới và Tết Giáp Thìn 2024",
      content: "Trong dịp đầu năm 2024 đến Tết Nguyên đán Giáp Thìn, TP.HCM sẽ tiếp tục tổ chức hàng loạt chuỗi hoạt động sự kiện để phục vụ người dân và du khách tham quan, thưởng lãm",
      category: "Du Lịch",
      date: "30/12/2023 ",
      imageUrl: "../../assets/anhBao6.jpg",
    },
    {
      id: "7",
      title: "10 biển số ô tô siêu VIP trúng đấu giá đắt nhất năm 2023",
      content: "Hàng trăm nghìn biển số ô tô đã lên sàn đấu giá trực tuyến trong năm 2023 với kết quả thành công ấn tượng, mức giá trúng của hầu hết biển đẹp đều là tiền tỷ. Trong top 10 biển số trúng đấu giá đắt nhất năm 2023 có 6 biển ngũ quý, 1 biển sảnh tiến",
      category: "Đời Sống",
      date: "31/12/2023",
      imageUrl: "../../assets/anhBao7.png",
    },
    {
      id: "8",
      title: "Đời thực sang chảnh của nữ Đại úy công an trong 'Đội điều tra số 7'",
      content: "Vào vai Đại úy Thanh Hằng trong 'Đội điều tra số 7', ít ai biết, BTV, diễn viên Minh Hương ngoài đời thực cũng là một Thượng úy công an nhân dân",
      category: "Giải Trí",
      date: "31/12/2023",
      imageUrl: "../../assets/anhBao8.jpg",
    },
    {
      id: "9",
      title: "Sắc đẹp Việt trên đấu trường quốc tế 2023: Kẻ khóc, người cười",
      content: "Sắc đẹp Việt có sự thăng hạng trên bản đồ nhan sắc thế giới năm 2023 với nhiều thành tích ấn tượng. Tuy nhiên, một số đại diện cũng gặp không ít ồn ào",
      category: "Giải Trí",
      date: "31/12/2023",
      imageUrl: "../../assets/anhBao9.jpg",
    },
  ];

  const handleItemClick = () => {
    console.log('Mục được nhấp vào');
  };

  return (
    <View style={styles.listHome}>
      <FlatList
        // scrollEnabled={false}
        style={styles.flatListHome}
        keyExtractor={(item) => item.id}
        data={newsList}
        renderItem={({item}) => (
        <View style={styles.newsSection}>
          <TouchableOpacity onPress={handleItemClick}>
            <View style={styles.newsDiv}>
              <View style={styles.newsDivSmall}>
                <Text
                  style={styles.newsTitles}
                  numberOfLines={3}
                  ellipsizeMode="tail"
                >
                  {item.title}
                </Text>
                <Text
                  style={styles.newsContent}
                  numberOfLines={3}
                  ellipsizeMode="tail"
                  textBreakStrategy="simple"
                >
                  {item.content}
                </Text>
              </View>
              <View style={styles.lineText}>
                <Text style={styles.newsCategorys}>{item.category}</Text>
                <Text style={styles.newsDates}>{item.date}</Text>
              </View>
            </View>
            <View style={styles.newsImagesDiv}>
              <View style={styles.newsImagesSmall}>
                {/* <Image
                  style={styles.newsImages}
                  // source={require(item.imageUrl)}
                  source={{ uri: item.imageUrl }}
                /> */}
                <Image
                  style={styles.newsImages}
                  source={{ uri: item.imageUrl }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}/>
    </View>
  )
}

const styles = StyleSheet.create({
  // Mục báo
  listHome: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: '#fff',
  },

  newsSection: {
    width: "100%",
    height: 170,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#6941DE",
    display: "flex",
    overflow: "hidden",
    marginBottom: 10,
  },

  // Nội dung
  newsDiv: {
    // maxWidth: "70%",
    width: "65%",
    height: "100%",
    // justifyContent: "flex-start",
    paddingTop: 4,
    paddingRight: 8,
    paddingBottom: 4,
    paddingLeft: 8,
  },

  newsDivSmall: {
    justifyContent: "flex-start",
  },

  newsTitles: {
    fontSize: 17,
    fontWeight: "bold",
    // textAlign: "justify",
  },

  newsContent: {
    fontSize: 15,
    textAlign: "justify",
    marginRight: 5,
  },

  // Ngày và Thể loại
  lineText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 20,
  },

  newsCategorys: {
    fontSize: 14,
    color: "#9c9c9c"
  },
  
  newsDates: {
    fontSize: 14,
    color: "#9c9c9c"
  },

  // Ảnh mục báo
  newsImagesDiv: {
    // maxWidth: "30%",
    width: "35%",
    height: "100%",
    // backgroundColor: "gray",
    justifyContent: "flex-end",
    right: 0,
    position: "absolute",
    overflow: "hidden",
  },

  newsImagesSmall: {
    maxHeight: "100%",
    maxWidth: "100%",
    margin: 2,
  },

  newsImages: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  }


});

export default ListHome;