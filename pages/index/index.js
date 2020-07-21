var app = getApp();

Page({
    data: {
        imgUrls: [],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        circular: true,
        productData: [],
        proCat:[],
        page: 2,
        index: 2,
        brand:[],
        // 滑动
        imgUrl: [],
        kbs:[],
        lastcat:[],
        course:[],
        collects: [
            {
                link: "images/cat/3d.png",
                name: "3d实体放样"
            }, {
                link: "images/cat/dx.png",
                name: "电线材料"
            }, {
                link: "images/cat/fs.png",
                name: "防水材料"
            }, {
                link: "images/cat/jc.png",
                name: "基础照明"
            }, {
                link: "images/cat/kg.png",
                name: "开关面板"
            }, {
                link: "images/cat/mz.png",
                name: "木作材料"
            }, {
                link: "images/cat/sl.png",
                name: "泥水材料"
            }, {
                link: "images/cat/qw.png",
                name: "全屋净水器"
            }, {
                link: "images/cat/sg.png",
                name: "水管试压"
            }, {
                link: "images/cat/yq.png",
                name: "油漆材料"
            }
        ]
    },
//跳转商品列表页   
    listdetail:function(e){
        console.log(e.currentTarget.dataset.title)
        wx.navigateTo({
            url: '../listdetail/listdetail?title='+e.currentTarget.dataset.title,
            success: function(res){
                // success
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        })
    },
//跳转商品搜索页  
    suo:function(e){
        wx.navigateTo({
            url: '../search/search',
            success: function(res){
                // success
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        })
    },
//后四个分类跳转
    other: function(e){
        var ptype =e.currentTarget.dataset.ptype;
        var title =e.currentTarget.dataset.text;
        if(ptype=='news'){
            wx.navigateTo({
                url: '../inf/inf'
            });
        }else if(ptype=='jxys'){
            wx.navigateTo({
                url: '../synopsis/synopsis?title=教学优势&wedId=2'
            });
        }else if(ptype=='xyfc'){
            wx.navigateTo({
                url: '../student_style/student_style'
            });
        }else if(ptype=='gywm'){
            wx.navigateTo({
                url: '../synopsis/synopsis?title=关于我们&wedId=1'
            });
        }
    },

//品牌街跳转商家详情页
    jj:function(e){
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../listdetail/listdetail?brandId='+id,
            success: function(res){
                // success
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        })
    },


    tian: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../works/works',
            success: function (res) {
                // success
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    },
//点击加载更多
    getMore:function(e){
        var that = this;
        var page = that.data.page;
        wx.request({
            url: app.d.ceshiUrl + '/Api/Index/getlist',
            method:'post',
            data: {page:page},
            header: {
                'Content-Type':  'application/x-www-form-urlencoded'
            },
            success: function (res) {
                var prolist = res.data.prolist;
                if(prolist==''){
                    wx.showToast({
                        title: '没有更多数据！',
                        duration: 2000
                    });
                    return false;
                }
                //that.initProductData(data);
                that.setData({
                    page: page+1,
                    productData:that.data.productData.concat(prolist)
                });
                //endInitData
            },
            fail:function(e){
                wx.showToast({
                    title: '网络异常！',
                    duration: 2000
                });
            }
        })
    },

    changeIndicatorDots: function (e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },
    changeAutoplay: function (e) {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },
    intervalChange: function (e) {
        this.setData({
            interval: e.detail.value
        })
    },
    durationChange: function (e) {
        this.setData({
            duration: e.detail.value
        })
    },

    onLoad: function (options) {
        var that = this;
        wx.request({
            url: app.d.ceshiUrl + '/Api/Index/index',
            method:'post',
            data: {},
            header: {
                'Content-Type':  'application/x-www-form-urlencoded'
            },
            success: function (res) {
                console.log(res);
                var ggtop = res.data.ggtop;
                var procat = res.data.procat;
                var prolist = res.data.prolist;
                var brand = res.data.brand;
                var course = res.data.course;
                //that.initProductData(data);
                that.setData({
                    imgUrls:ggtop,
                    proCat:procat,
                    productData:prolist,
                    brand: brand,
                    course: course
                });
                //endInitData
            },
            fail:function(e){
                wx.showToast({
                    title: '网络异常！',
                    duration: 2000
                });
            },
        })
        wx.request({
            url: app.d.ceshiUrl + '/Api/Category/index',
            method:'post',
            data: {},
            header: {
                'Content-Type':  'application/x-www-form-urlencoded'
            },
            success: function (res) {
                //--init data
                var status = res.data.status;
                if(status==1) {
                    var list = res.data.list;
                    that.setData({
                        types:list,
                    });
                } else {
                    wx.showToast({
                        title:res.data.err,
                        duration:2000,
                    });
                }
                console.log(list)
            },
            error:function(e){
                wx.showToast({
                    title:'网络异常！',
                    duration:2000,
                });
            },

        });
    },
    onShareAppMessage: function () {
        return {
            title: '宠物美容学校',
            path: '/pages/index/index',
            success: function(res) {
                // 分享成功
            },
            fail: function(res) {
                // 分享失败
            }
        }
    }



});