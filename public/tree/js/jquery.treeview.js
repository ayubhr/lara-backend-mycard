function TreeView(datas, options) {
    this.root = document.createElement("div");
    this.root.className = "treeview";
    let t = this;



    var defaultOptions = {
        showAlwaysCheckBox: true,
        fold: true,
        openAllFold:false
    }

    options = Object.assign(defaultOptions, options);


    // GROUP EVENTS ---------------------

    function groupOpen() {
        $(this).parent().find(">.group").slideDown("fast");
    }
    function groupClose() {
        $(this).parent().find(">.group").slideUp("fast");
    }
    function groupToggle() {
        $(this).parent().find(">.group").slideToggle("fast");
    }



    // ITEM EVENTS --------------------


    function checkControlParents() {
        var $parents = $(this).parents(".treeview .group");

        for (var index = 1 ; index < $parents.length ; index++) {
            var el = $parents[index];
            item = $(el).find(">.item").get(0);
            $children = $(el).find(".group .item");
            var all1 = true;
            var all0 = true;
            for (var i = 0; i < $children.length; i++) {
                if ($children[i].checked != 1) all1 = false;
                if ($children[i].checked != 0) all0 = false;
            }
            if (all1) setCheckState.bind(item)(1);
            else if (all0) setCheckState.bind(item)(0);
            else setCheckState.bind(item)(2);
        }
    }

    function setCheckState(value,data=false) {


        let ok = false;
        if(data != false){
            
            ok = true;
            this.setAttribute("role-value", data.role);

        }

        this.checked = value
        this.setAttribute("check-value", value)
        

        if(ok){


            if(data.role === "agent"){

                $(this).find(">[check-icon]")[0].className = "fa fa-star color-agent";


            }

            if(data.role === "shop"){

                $(this).find(">[check-icon]")[0].className = "fa fa-star-half-o color-shop";


            }

            if(data.role === "player"){

                $(this).find(">[check-icon]")[0].className = "fa fa-user-circle-o color-player";


            }


        }


        if (value == 2) {
            $(this).find(">[check-icon]")[0].className = "fa fa-dot-circle-o color-red";
        }
    }

    /* FIRST CREATION */

    function createTreeViewReq(parentNode, datas, options) {


        for (var i = 0; i < datas.length; i++) {
            if (datas[i] != null) {
                var data = datas[i];
                var item = createSingleItem(data);
                parentNode.appendChild(item);
                if ("children" in data && data.children.length > 0) {
                    createTreeViewReq(item, data.children, options)
                }
            }
        }
    }

    function createSingleItem(data) {
        var group = document.createElement("p");
        group.className = "group"

        if(data.role != "admin"){

            group.style.display = "none";

        }
        if ("className" in options){
            group.className += options.className;
        }

        if ("fold" in options) {
            var foldButton = document.createElement("i");

            if(data.role === "admin"){

            foldButton.className = "fa fa-caret-right clickme";

            }else{

            foldButton.className = "fa fa-caret-right";

            }

            foldButton.setAttribute("fold-button", 1);
           
            foldButton.onclick = groupToggle.bind(foldButton);

            foldButton.isOpened = options.fold;
            
            group.appendChild(foldButton)
        }

        // ALERT ADD ICON
        var item = document.createElement("div");
        item.className = "item";
        if(data.role != "player" && data.role != "admin" ){

            item.innerHTML = `${data.text} <span class="color-grey" style="">(${data.count})</span>`;

        }else {

            item.innerHTML = `${data.text}`;
        }

        if ("checked" in data || options.showAlwaysCheckBox == true) {
            var checked = document.createElement("i");
            checked.setAttribute("check-icon", "1");
            checked.className = "fa ";

            item.prepend(checked);

            if ("checked" in data && data.checked) {
                setCheckState.bind(item)(data.checked ? 1 : 0,data);
            } else {
                setCheckState.bind(item)(0,data);
            }

        }

        if(data.role != "admin"){

            var itemx = document.createElement("span");
            itemx.className = "solde";
            if(data.role === "player"){

                itemx.innerHTML = `<span class="color-grey"> balance : </span> ${data.sold_sport.toFixed(2)} <span class="color-red"> TND</span>`;

            }else{
                itemx.innerHTML = `${data.sold_sport.toFixed(2)} <span class="color-red"> TND </span>`;
            }
            item.append(itemx);
        }
        //item.onclick = changeCheckState.bind(item);

        group.appendChild(item);

        return group;
    }




    this.update = function () {
        $(t.root).find(".group").each(function (index, el) {
            if ($(el).find(".group").length > 0) {
                $(el).find(">[fold-button]").css("visibility", "visible");
            } else {
                $(el).find(">[fold-button]").css("visibility", "hidden");
            }
            checkControlParents.bind($(el).find(">.item"))();
        })

    }

    this.load = function (datas) {
        $(this.root).empty();
        createTreeViewReq(this.root, datas, options);
        this.update();
    }
    this.save = function (type, node) {
        if (type == null) type = "tree";


        if (type == "tree") {
            if (node == null) {
                var data = [];
                var $children = $(this.root).find(">.group");
                for (var i = 0; i < $children.length; i++) {
                    var child = this.save("tree", $children[i])
                    data.push(child)
                }
                return data;
            } else {
                var data = saveSingle($(node).find(">.item")[0]);
                data.children = []
                var $children = $(node).find(">.group");

                for (var i = 0; i < $children.length; i++) {
                    var child = this.save("tree", $children[i])
                    data.children.push(child);
                }
                return data;
            }

        }

        if (type == "list") {
            var data = [];
            var $items = $(this.root).find(".item");
            for (var i = 0; i < $items.length; i++) {
                data.push(saveSingle($items[i]));
            }
            return data;
        }
    }
    function saveSingle(el) {
        if (el == null) el = this;
        ret = Object.assign(
            { children: [] },
            el.data,
            { checked: el.checked });

        return ret;
    }

    this.load(datas);
    this.openAllFold = function (item) {
        if (item == null) item = this.root;
        $(item).find("[fold-button]").each(function (index, el) {
            
            groupOpen.bind(this)();
        })
    }
    this.closeAllFold = function (item) {
        if (item == null) item = this.root;
        $(item).find("[fold-button]").each(function (index, el) {

            groupClose.bind(this)();
        })
    }
    
    if (options.openAllFold) {
        this.openAllFold();
    } else {
        this.closeAllFold();
    }
    return this;

}
