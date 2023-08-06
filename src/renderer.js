const { getConfig, setConfig, getEnums, getAllLang,
    sendMessage, openURL } = window.BetterQQ;
const { plugin: pluginPath, data: dataPath } = LiteLoader.plugins.BetterQQ.path

/**
 * the global config
 */
let globalConfig = getConfig(dataPath).then((localConfig) => globalConfig = localConfig);

/**
 * the enums
 */
let enums = getEnums().then((localEnums) => enums = localEnums);

/**
 * all languages
 */
let allLangs = getAllLang().then((_allLangs) => allLangs = _allLangs);

/**
 * check update
 * @returns data
 */
function checkUpdate() {
    let url = `https://api.github.com/repos/GashByte/BetterQQNTUtil/releases`;
    let data;
    getAPIContent(url)
        .then((_data) => {
            data = _data[0].name; // 0.1.0
            let now = new Date();
            let checktime = `${now.getMonth()}月${now.getDate()}日${now.getHours()}时${now.getMinutes()}分`;
            globalConfig.AutoUpdate.Version.globalVersion = data;
            globalConfig.AutoUpdate.Version.lastCheckTime = checktime;
        });
}

/**
 * need to update?
 */
function needUpdate(localVersion, globalVersion) {
    if (localVersion == undefined || globalVersion == undefined) {
        return {
            needUpdate: true,
            msg: "网络连接失败",
            level: "error"
        }
    }

    if (typeof globalVersion != "string") {
        if (typeof globalVersion == 'object') {
            return {
                needUpdate: true,
                msg: "网络连接失败",
                level: "error"
            }
        }

        globalVersion = JSON.stringify(globalVersion);
    }

    for (let i = 0; i <= 2; i++) {
        if (localVersion.split(`.`)[i] < globalVersion.split(`.`)[i]) {
            return {
                needUpdate: true,
                msg: "发现新的版本",
                level: "success"
            }
        }
    }
    return {
        needUpdate: false,
        msg: "已经是最新版本",
        level: "success"
    }
}

/**
 * 插入Util页面
 */
function insertUtilPage(page = `mainPage`) {
    let _tempContent = page == `mainPage` ? `通用` : `设置`;

    let mainContainer = document.querySelector('body > .BetterQQNTUtil');
    let insertPage = () => {
        // mainContainer
        document.querySelector(`body`).insertAdjacentHTML(`afterbegin`, `
            <div class="BetterQQNTUtil" style="position: fixed; z-index: 5000;"></div>
        `);
        // modal
        document.querySelector(`body > .BetterQQNTUtil`).insertAdjacentHTML(`afterbegin`, `
        <link rel="stylesheet" type="text/css" href="app://./renderer/css/75982.fd8100d5.css">
        <link rel="stylesheet" type="text/css" href="app://./renderer/css/98597.9b999618.css">
        <div class="dialog" style="opacity: 0;position: fixed;z-index: 5000;">
            <div class="q-dialog-modal" style="position: inherit; background: var(--overlay_mask_dark);"></div>
        </div>
        `);
        // main page
        document.querySelector(`body > .BetterQQNTUtil > .dialog`).insertAdjacentHTML(`beforeend`, `
        <div id="app" style="height: 100%;width: 100%;position: inherit;" data-v-app="">
            <div class="setting-layout" data-v-0a143054>
                <div class="setting-tab" style="background: #00000090;border-right: 2px solid #78787850;" data-v-0a143054>
                    <div class="nav-bar" data-v-53503cce="" data-v-0a143054>
                        <div class="nav-item ${page == `mainPage` ? `nav-item-active` : ``}" id="mainPage" style="padding-top:5px; padding-bottom:5px" data-v-53503cce="">
                            <i class="q-icon icon" data-v-717ec976="" data-v-53503cce="" style="--b4589f60: inherit; --6ef2e80d: 16px;">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.25 9C15.4926 9 16.5 7.99264 16.5 6.75C16.5 5.50736 15.4926 4.5 14.25 4.5C13.0074 4.5 12 5.50736 12 6.75C12 7.99264 13.0074 9 14.25 9ZM14.25 3C16.1515 3 17.7225 4.41532 17.967 6.25H21V7.75H17.8652C17.4276 9.33559 15.9748 10.5 14.25 10.5C12.5252 10.5 11.0724 9.33559 10.6348 7.75H3V6.25H10.533C10.7775 4.41532 12.3485 3 14.25 3ZM21 16.25V17.75H13.467C13.2225 19.5847 11.6515 21 9.75 21C7.84846 21 6.27749 19.5847 6.03304 17.75H3V16.25H6.13481C6.57243 14.6644 8.02523 13.5 9.75 13.5C11.4748 13.5 12.9276 14.6644 13.3652 16.25H21ZM7.5 17.25C7.5 18.4926 8.50736 19.5 9.75 19.5C10.9926 19.5 12 18.4926 12 17.25C12 16.0074 10.9926 15 9.75 15C8.50736 15 7.5 16.0074 7.5 17.25Z" fill="currentColor"></path>
                                </svg>
                            </i>
                            <div class="basicSetting" data-v-53503cce="">通用</div>
                        </div>
                        <div class="nav-item ${page == `settingPage` ? `nav-item-active` : ``}" id="settingPage" style="padding-top:5px; padding-bottom:5px" data-v-53503cce="">
                            <svg t="1691060731269" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2310" width="16" height="16">
                                <path d="M282.112 256.928c-13.12 13.216-30.624 20.512-49.28 20.512-18.624 0-36.16-7.296-49.312-20.512L150.624 223.904l98.624-99.04 32.896 33.024c13.184 13.216 20.48 30.816 20.48 49.536a69.6 69.6 0 0 1-20.512 49.472zM249.312 190.912H249.28L216.384 223.904a23.104 23.104 0 0 0 32.864 0.032 23.296 23.296 0 0 0 0.032-32.992z m147.392 208.736L249.568 257.216l32.288-33.632 147.168 142.464-32.32 33.6z m354.752 362.432l-133.344-140.128 32.896-32.992 133.344 140.128-32.896 32.992z m98.72 65.952a115.872 115.872 0 0 1-164.256 0.128l-147.744-154.592 32.896-33.024 147.744 154.624a69.632 69.632 0 0 0 98.496-0.16 70.464 70.464 0 0 0-0.128-99.2l-147.424-154.272 32.864-33.024 147.456 154.304a117.28 117.28 0 0 1 0.128 165.216z m-48.448-400.416a161.408 161.408 0 0 1-115.072 47.872c-43.456 0-84.32-16.992-115.072-47.872s-47.68-71.872-47.68-115.52 16.928-84.704 47.68-115.552l42.496-42.656 32.896 32.992-42.496 42.656a116.064 116.064 0 0 0-34.08 82.56c0 31.168 12.096 60.448 34.08 82.496s51.168 34.208 82.208 34.208c31.072 0 60.256-12.128 82.208-34.208l42.496-42.656 32.896 33.024-42.496 42.656z m42.496-42.656l-49.312-49.504-16.448 16.48a92.064 92.064 0 0 1-65.728 27.36h-0.032a92.128 92.128 0 0 1-65.728-27.36c-17.536-17.6-27.264-41.088-27.264-66.016s9.664-48.416 27.264-66.048l16.448-16.512-49.344-49.504 32.896-33.024 82.208 82.528-49.312 49.472a46.656 46.656 0 0 0-13.632 33.056c0 12.448 4.864 24.192 13.632 32.992s20.448 13.696 32.896 13.696c12.416 0 24.096-4.864 32.864-13.696l49.344-49.504 82.208 82.528-32.896 33.024zM233.6 766.848v-46.688h46.528v46.688H233.6z m304.576-227.392l-92.256-91.584 32.704-33.184 92.224 91.552-32.672 33.216z m-233.952 255.488l173.632-239.84 37.632 27.456-177.184 244.192a115.2 115.2 0 0 1-82.208 34.208c-31.04 0-60.224-12.16-82.208-34.176-21.952-22.048-34.08-51.328-34.08-82.528s12.096-60.48 34.08-82.528l2.752-2.368 240.544-175.424 27.36 37.728-239.008 174.304a69.568 69.568 0 0 0-19.232 48.256c0 18.72 7.264 36.288 20.448 49.504 25.952 26.08 70.976 26.528 97.408 1.184z" p-id="2311" fill="#ffffff"></path>
                            </svg>
                            <div class="basicSetting" data-v-53503cce="" style="padding-left: 7px;"> BetterQQNTUtil设置</div>
                        </div>
                        <div class="nav-item" id="github" style="width: 185px;position: absolute;bottom: 7%;padding-top:5px;padding-bottom:5px" data-v-53503cce="">
                            <svg t="1691297785442" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2284" width="16" height="16">
                                <path d="M20.48 503.72608c0 214.4256 137.4208 396.73856 328.94976 463.6672 25.8048 6.5536 21.87264-11.8784 21.87264-24.33024v-85.07392c-148.93056 17.44896-154.86976-81.1008-164.94592-97.52576-20.23424-34.52928-67.91168-43.33568-53.69856-59.76064 33.91488-17.44896 68.48512 4.42368 108.46208 63.61088 28.95872 42.88512 85.44256 35.6352 114.15552 28.4672a138.8544 138.8544 0 0 1 38.0928-66.7648c-154.25536-27.60704-218.60352-121.77408-218.60352-233.79968 0-54.31296 17.94048-104.2432 53.0432-144.54784-22.36416-66.43712 2.08896-123.24864 5.3248-131.6864 63.81568-5.7344 130.00704 45.6704 135.168 49.68448 36.2496-9.78944 77.57824-14.9504 123.82208-14.9504 46.4896 0 88.064 5.3248 124.5184 15.23712 12.288-9.4208 73.80992-53.53472 133.12-48.128 3.15392 8.43776 27.0336 63.93856 6.02112 129.4336 35.59424 40.38656 53.69856 90.76736 53.69856 145.24416 0 112.18944-64.7168 206.4384-219.42272 233.71776a140.0832 140.0832 0 0 1 41.7792 99.9424v123.4944c0.86016 9.87136 0 19.6608 16.50688 19.6608 194.31424-65.49504 334.2336-249.15968 334.2336-465.5104C1002.57792 232.48896 782.66368 12.77952 511.5904 12.77952 240.18944 12.65664 20.48 232.40704 20.48 503.72608z" fill="#e6e6e6" opacity=".65" p-id="2285" data-spm-anchor-id="a313x.search_index.0.i4.31863a81hWoCVW" class="selected"></path></svg>
                            <div class="basicSetting" data-v-53503cce="" style="padding-left: 7px;">Github</div>
                        </div>
                        <div class="separator" style="position: absolute;bottom: 7%;width: 185px;height: 1px;background: #F2F2F232;margin-left: 9px;padding-top: 3px;border-radius: 10px;"></div>
                        <div class="nav-item" id="reload" data-v-53503cce="" style="padding-top:5px; padding-bottom:5px; position: absolute; bottom: 3%; width: 185px;">
                            <i class="q-icon icon" data-v-717ec976="" data-v-53503cce="" style="--b4589f60: inherit; --6ef2e80d: 16px;">
                                <svg t="1691242812958" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2285" width="2048" height="2048"><path d="M750.592 801.792A409.6 409.6 0 1 1 870.4 512h-102.4a307.2 307.2 0 1 0-90.112 217.088l72.704 72.704zM614.4 512h409.6l-204.8 204.8-204.8-204.8z" p-id="2286" fill="gray"></path></svg>
                            </i>
                            <div class="reload" data-v-53503cce="">重新加载所有内容</div>
                        </div>
                        <div class="nav-item" id="quit" data-v-53503cce="" style="padding-top:5px; padding-bottom:5px; position: absolute; bottom: 0%; width: 185px;">
                            <i class="q-icon icon" data-v-717ec976="" data-v-53503cce="" style="--b4589f60: inherit; --6ef2e80d: 16px;">
                                <svg t="1690773931499" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2295" width="200" height="200"><path d="M856.8 389.8c-18.9-44.7-45.9-84.8-80.4-119.2-18.9-18.9-39.5-35.6-61.7-49.9-10-6.5-23.3 0.6-23.3 12.6 0 5.1 2.6 9.9 6.9 12.6 95 61.5 158 168.5 158 289.8 0 190.3-154.8 345-345 345s-345-154.8-345-345c0-122.4 64.1-230.2 160.5-291.4 4.4-2.8 7-7.6 7-12.7 0-11.8-13.1-19.1-23.1-12.8-23.2 14.7-44.8 32-64.6 51.8-34.4 34.4-61.5 74.5-80.4 119.2-19.6 46.2-29.5 95.3-29.5 146s9.9 99.7 29.5 146c18.9 44.7 45.9 84.8 80.4 119.2 34.4 34.4 74.5 61.5 119.2 80.4 46.2 19.6 95.3 29.5 146 29.5 50.6 0 99.7-9.9 146-29.5 44.7-18.9 84.8-45.9 119.2-80.4s61.5-74.5 80.4-119.2c19.6-46.2 29.5-95.3 29.5-146s-10-99.8-29.6-146z" fill="#ffffff" p-id="2296"></path><path d="M512 431.1c-8.8 0-16-7.2-16-16V98.2c0-8.8 7.2-16 16-16s16 7.2 16 16V415c0 8.9-7.2 16.1-16 16.1z" fill="#ffffff" p-id="2297"></path></svg>
                            </i>
                            <div class="quit" data-v-53503cce="">退出</div>
                        </div>
                    </div>
                </div>
                <div class="setting-main" data-v-0a143054>
                    <div class="setting-title" data-v-3651a79e="" data-v-0a143054>
                        <div class="icon-area" data-v-3651a79e=""></div> BetterQQNTUtil
                    </div>
                    <div class="setting-main__content" style="opacity:0;" data-v-0a143054>
                        <div class="q-scroll-view scroll-view--show-scrollbar" data-v-0a143054>
                            <div class="common-tab" style="padding-right: 15px;padding-left: 15px" data-v-49c8f2d3="" data-v-0a143054>
                                <div class="setting-item-title" data-v-526bdad1="" data-v-ac5f0656="">${_tempContent}</div>
                                <!-- 插件、设置 -->
                            </div>
                            <div class="loadmore-placeholder" style="display: none;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `);

        // dialog animation
        let dialog = document.querySelector(`body > .BetterQQNTUtil > .dialog`);
        opacityAnimation(dialog, 0.5, true);

        // exit button action
        let exitButton = dialog.querySelector(`#app > .setting-layout > .setting-tab > .nav-bar > .nav-item:last-child`);
        exitButton.addEventListener('click', () => {
            opacityAnimation(dialog, 0.5, false, document.querySelector(`body > .BetterQQNTUtil`));
        });

        // get the nav bar
        let navBar = dialog.querySelector(`#app > .setting-layout > .setting-tab > .nav-bar`);

        // reload button
        let reloadButton = dialog.querySelector(`#app > .setting-layout > .setting-tab > .nav-bar > #reload`);
        reloadButton.addEventListener('click', () => {
            // 重新加载
            location.reload();
        });

        // github
        let githubButton = dialog.querySelector(`#app > .setting-layout > .setting-tab > .nav-bar > #github`);
        githubButton.addEventListener('click', () => {
            opacityAnimation(dialog, 0.5, false, document.querySelector(`body > .BetterQQNTUtil`));
            openURL(`https://github.com/GashByte/BetterQQNTUtil`);
        });

        // setting-main__content
        let settingMainContent = dialog.querySelector(`#app > .setting-layout > .setting-main > .setting-main__content`);
        opacityAnimation(settingMainContent, 0.3, true);
        navBarClickEvent(navBar, settingMainContent);
    }

    // 如果setting-main__content存在 就删除
    let _settingMainContent = document.querySelector(`body > .BetterQQNTUtil > .dialog > #app > .setting-layout > .setting-main > .setting-main__content`);
    if (_settingMainContent) {
        _settingMainContent.remove();
    }

    if (!mainContainer) {
        insertPage();
    } else if (page == `settingPage` || page == `mainPage`) {
        // remove the BetterQQNTUtil
        // 插入 setting-main__content
        let settingMainContent = document.querySelector(`body > .BetterQQNTUtil > .dialog > #app > .setting-layout > .setting-main`);
        settingMainContent.insertAdjacentHTML('beforeend', `
        <div class="setting-main__content" style="opacity:0;" data-v-0a143054>
            <div class="q-scroll-view scroll-view--show-scrollbar" data-v-0a143054>
                <div class="common-tab" style="padding-right: 15px;padding-left: 15px" data-v-49c8f2d3="" data-v-0a143054>
                    <div class="setting-item-title" data-v-526bdad1="" data-v-ac5f0656="">${_tempContent}</div>
                    <!-- 插件、设置 -->
                </div>
                <div class="loadmore-placeholder" style="display: none;"></div>
            </div>
        </div>
        `);
    }

    // dialog
    let dialog = document.querySelector(`body > .BetterQQNTUtil > .dialog`);

    // insert the settings
    let chatPage = dialog.querySelector(`#app > .setting-layout > .setting-main > .setting-main__content > .q-scroll-view > .common-tab`);
    let mainPageAction = () => {
        Object.keys(enums).forEach((key) => {
            let enabledKey = chatPage.querySelector(`.panel-main.enable-${enums[key].slug}`);
            if (enabledKey) {
                return;
            }

            if (key == "BetterQQUtil") {
                chatPage.insertAdjacentHTML(`beforeend`, `
                <div class="setting-item-title BetterQQNTUtil" style="padding-top:10px" data-v-526bdad1="" data-v-ac5f0656="">BetterQQUtil设置</div>
                <div class="panel-main enable-BetterQQUtil" style="opacity:0;"></div>
                <div class="panel-main BetterQQNTUtil HotKey" style="margin-bottom: 8px;" data-v-47c639d4="">
                    <div data-v-47c639d4="">
                        <div class="text" data-v-47c639d4="">呼出热键</div>
                        <div class="tips" data-v-47c639d4="">您可以通过呼出热键来呼出BetterQQNTUtil的菜单</div>
                    </div>
                    <input class="input" type="text" spellcheck="false" placeholder="${globalConfig["BetterQQUtil"].hotKey}" style="color: white;border-bottom-style: groove;appearance: none;box-sizing: border-box;background: none;">
                </div>
                <div class="panel-main BetterQQNTUtil Interval" style="margin-bottom: 8px;" data-v-47c639d4="">
                    <div data-v-47c639d4="">
                        <div class="text" data-v-47c639d4="">延迟出现</div>
                        <div class="tips" data-v-47c639d4="">菜单将在延迟 ${globalConfig["BetterQQUtil"].interval} 毫秒后出现</div>
                    </div>
                    <input class="input" type="text" spellcheck="false" placeholder="${globalConfig["BetterQQUtil"].interval}" style="color: white;border-bottom-style: groove;appearance: none;box-sizing: border-box;background: none;">
                </div>
                `);

                // 监听 item-body 点击事件
                let itemBody = chatPage.querySelector(`.panel-main.BetterQQNTUtil.HotKey > input`);
                itemBody.addEventListener(`keydown`, (e) => {
                    itemBody.value = e.key;
                    globalConfig["BetterQQUtil"].hotKey = e.key;
                    setConfig(dataPath, globalConfig);
                });

                // 监听 Interval 输入事件
                let IntervalInput = chatPage.querySelector(`.panel-main.BetterQQNTUtil.Interval > .input`);
                IntervalInput.addEventListener(`input`, () => {
                    IntervalInput.setAttribute(`placeholder`, `${IntervalInput.value}`);
                    globalConfig["BetterQQUtil"].interval = IntervalInput.value;
                    setConfig(dataPath, globalConfig);
                });
            }

            if (key == "DebugMode") {
                chatPage.insertAdjacentHTML(`beforeend`, `
                <div class="setting-item-title DebugMode" style="padding-top:10px" data-v-526bdad1="" data-v-ac5f0656="">调试内容</div>
                <div class="panel-main enable-${enums[key].slug}" style="margin-bottom: 8px;" data-v-47c639d4="">
                    <div data-v-47c639d4="">
                        <div class="text" data-v-47c639d4="">${enums[key].name}</div>
                        <div class="tips" data-v-47c639d4="">${enums[key].desc}</div>
                    </div>
                    <div class="q-switch" data-v-47c639d4="">
                        <span class="q-switch__handle"></span>
                    </div>
                </div>
                <div class="panel-main enable-${enums["Reload"].slug}" style="${globalConfig.DebugMode.enable == true ? 'margin-bottom: 8px;' : 'display:none;'}" data-v-47c639d4="">
                    <div data-v-47c639d4="">
                        <div class="text" data-v-47c639d4="">${enums["Reload"].name}</div>
                        <div class="tips" data-v-47c639d4="">${enums["Reload"].desc}</div>
                    </div>
                    <div class="q-switch" data-v-47c639d4="">
                        <span class="q-switch__handle"></span>
                    </div>
                </div>
                <div class="panel-main enable-${enums["BetterConsole"].slug}" style="${globalConfig.DebugMode.enable == true ? 'margin-bottom: 8px;' : 'display:none;'}" data-v-47c639d4="">
                    <div data-v-47c639d4="">
                        <div class="text" data-v-47c639d4="">${enums["BetterConsole"].name}</div>
                        <div class="tips" data-v-47c639d4="">${enums["BetterConsole"].desc}</div>
                    </div>
                    <div class="q-switch" data-v-47c639d4="">
                        <span class="q-switch__handle"></span>
                    </div>
                </div>
                `);

                // reload switch
                let reloadSwitch = chatPage.querySelector(`.panel-main.enable-${enums["Reload"].slug} > .q-switch`);
                reloadSwitch.addEventListener('click', () => {
                    // 获取当前状态
                    let currentStatus = reloadSwitch.getAttribute('class');
                    reloadSwitch.setAttribute(`class`, currentStatus.includes('is-active') ? `q-switch` : `q-switch is-active`);
                    let enable = currentStatus.includes('is-active') ? false : true;
                    // 设置config
                    globalConfig["Reload"].enable = enable;
                    // 保存配置
                    setConfig(dataPath, globalConfig);
                });

                // BetterConsole switch
                let BetterConsoleSwitch = chatPage.querySelector(`.panel-main.enable-${enums["BetterConsole"].slug} > .q-switch`);
                BetterConsoleSwitch.addEventListener('click', () => {
                    dropMessage(`该功能还在继续开发中,将在后续的版本内陆续开放! await for it!`, `error`);
                    /*
                    // 获取当前状态
                    let currentStatus = BetterConsoleSwitch.getAttribute('class');
                    BetterConsoleSwitch.setAttribute(`class`, currentStatus.includes('is-active') ? `q-switch` : `q-switch is-active`);
                    let enable = currentStatus.includes('is-active') ? false : true;
                    // 设置config
                    globalConfig["BetterConsole"].enable = enable;
                    // 保存配置
                    setConfig(dataPath, globalConfig);
                    */
                });
            }

            if (key == "AutoUpdate") {
                chatPage.insertAdjacentHTML(`beforeend`, `
                <div class="setting-item-title AutoUpdate" style="padding-top:10px" data-v-526bdad1="" data-v-ac5f0656="">自动更新</div>
                <div class="panel-main enable-${enums[key].slug}" style="margin-bottom: 8px;" data-v-47c639d4="">
                    <div data-v-47c639d4="">
                        <div class="text" data-v-47c639d4="">${enums[key].name}</div>
                        <div class="tips" data-v-47c639d4="">${enums[key].desc}</div>
                    </div>
                    <div class="q-switch" data-v-47c639d4="">
                        <span class="q-switch__handle"></span>
                    </div>
                </div>
                `);
            }

            let sepcialKey = ["DebugMode", "Reload", "BetterConsole", "AutoUpdate", "BetterQQUtil"];
            if (!sepcialKey.includes(key)) {
                chatPage.insertAdjacentHTML(`beforeend`, `
                <div class="panel-main enable-${enums[key].slug}" style="margin-bottom: 8px;" data-v-47c639d4="">
                    <div data-v-47c639d4="">
                        <div class="text" data-v-47c639d4="">${enums[key].name}</div>
                        <div class="tips" data-v-47c639d4="">${enums[key].desc}</div>
                    </div>
                    <div class="q-switch" data-v-47c639d4="">
                        <span class="q-switch__handle"></span>
                    </div>
                </div>
                `);
            }

            // qswitch事件
            let qswitch = chatPage.querySelector(`.panel-main.enable-${enums[key].slug} > .q-switch`);
            if (qswitch) {
                qswitch.addEventListener('click', () => {
                    if(enums[key].slug == "PlusOne" || enums[key].slug == "AudioVideoAssistant") {
                        dropMessage(`该功能还在继续开发中,将在后续的版本内陆续开放! await for it!`, `error`);
                        return;
                    }

                    // 获取当前状态
                    let currentStatus = qswitch.getAttribute('class');
                    qswitch.setAttribute(`class`, currentStatus.includes('is-active') ? `q-switch` : `q-switch is-active`);
                    let enable = currentStatus.includes('is-active') ? false : true;
                    // 设置config
                    globalConfig[key].enable = enable;
                    // 保存配置
                    setConfig(dataPath, globalConfig);

                    enable ? addButtonAction(key) : removeButtonAction(key);
                });
            }
        });

        // 读取配置
        Object.keys(globalConfig).forEach((key) => {
            if (key == 'reload' || key == 'BetterConsole') {
                if (!globalConfig['DebugMode'].enable) {
                    return;
                }
            }

            // 更改key下的switch状态
            let qswitch = chatPage.querySelector(`.panel-main.enable-${key} > .q-switch`);
            if (!qswitch) return; // BetterQQUtil
            let enable = globalConfig[key].enable;
            qswitch.setAttribute(`class`, enable ? `q-switch is-active` : `q-switch`);
        });
    }
    let settingPageAction = () => {
        // config -> Translator、RemoveRedPoint、CustomNavBar、AudioVideoAssistant、Reload、BetterConsole、AutoUpdate
        let modulesMap = ["Translator", "RemoveRedPoint", "CustomNavBar", "AudioVideoAssistant", "Reload", "BetterConsole", "AutoUpdate"];
        Object.keys(globalConfig).forEach((key) => {
            if (modulesMap.includes(key)) {
                if (!globalConfig[key].enable) {
                    return;
                }

                if (key == "Translator") {
                    chatPage.insertAdjacentHTML(`beforeend`, `
                    <div class="setting-item-title TranslatorSetting" data-v-526bdad1="" style="padding-top:8px;" data-v-ac5f0656="">翻译器设置</div>
                    <div class="panel-main TranslatorSetting ChooseAPI" style="margin-bottom: 0px;" data-v-47c639d4="">
                        <div data-v-47c639d4="">
                            <div class="text" data-v-47c639d4="">请选择一个API</div>
                            <div class="tips" data-v-47c639d4="">目前仅支持百度API(如果需要其他的请反馈,我会申请)</div>
                        </div>
                        <div class="q-pulldown-menu small-size pulldown-menu" aria-disabled="false" data-v-1694949b="" style="width: 130px; pointer-events: auto;">
                            <div class="q-pulldown-menu-button">
                                <input id="qPullDownMenuTrigger" type="text" class="content" spellcheck="false" readonly="" placeholder="Baidu" aria-controls="qContextMenu" aria-expanded="false" aria-haspopup="menu" aria-owns="qContextMenu" role="combobox">
                                <span class="icon">
                                    <i class="q-icon" data-v-717ec976="" style="--b4589f60: inherit; --6ef2e80d: 16px;">
                                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 6.0001L8.00004 10L4 6" stroke="currentColor" stroke-linejoin="round"></path>
                                        </svg>
                                    </i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="panel-main TranslatorSetting Appid" style="margin-bottom: 0px;" data-v-47c639d4="">
                        <div data-v-47c639d4="">
                            <div class="text" data-v-47c639d4="">请填写你的百度Appid</div>
                            <div class="tips" data-v-47c639d4="">这是必须要填写的内容 否则你会无法使用翻译器</div>
                        </div>
                        <input class="input" type="text" spellcheck="false" placeholder="${globalConfig.Translator.APIConfig.BaiduAPI.Appid}" style="color: white;border-bottom-style: groove;appearance: none;box-sizing: border-box;background: none;">
                    </div>
                    <div class="panel-main TranslatorSetting SecretKey" style="margin-bottom: 0px;" data-v-47c639d4="">
                        <div data-v-47c639d4="">
                            <div class="text" data-v-47c639d4="">请填写你的百度SecretKey</div>
                            <div class="tips" data-v-47c639d4="">这是必须要填写的内容 否则你会无法使用翻译器</div>
                        </div>
                        <input class="input" type="text" spellcheck="false" placeholder="${globalConfig.Translator.APIConfig.BaiduAPI.SecretKey}" style="color: white;border-bottom-style: groove;appearance: none;box-sizing: border-box;background: none;">
                    </div>
                    <div class="panel-main TranslatorSetting SourceLang" style="margin-bottom: 0px;" data-v-47c639d4="">
                        <div data-v-47c639d4="">
                            <div class="text" data-v-47c639d4="">请选择 原语种</div>
                            <div class="tips" data-v-47c639d4="">即为对方所说的语种 如果不知道 可以选择 自动选择auto(默认)</div>
                        </div>
                        <select class="converterSelect target" style="background-color: transparent; color: var(--text_primary); font-size: 13px; width: 150px; padding: 2px 8px 1px; border-radius: 4px; border: 1px solid var(--border_dark);"></select>
                    </div>
                    <div class="panel-main TranslatorSetting TargetLang" style="margin-bottom: 0px;" data-v-47c639d4="">
                        <div data-v-47c639d4="">
                            <div class="text" data-v-47c639d4="">请选择 目标语种</div>
                            <div class="tips" data-v-47c639d4="">即为你想翻译成的语种(默认zh)</div>
                        </div>
                        <select class="converterSelect target" style="background-color: transparent; color: var(--text_primary); font-size: 13px; width: 150px; padding: 2px 8px 1px; border-radius: 4px; border: 1px solid var(--border_dark);"></select>
                    </div>
                    <div class="panel-main TranslatorSetting AskConfigEveryTime" style="margin-bottom: 0px;" data-v-47c639d4="">
                        <div data-v-47c639d4="">
                            <div class="text" data-v-47c639d4="">每次都询问翻译配置</div>
                            <div class="tips" data-v-47c639d4="">将在翻译时询问你的翻译配置是否得当</div>
                        </div>
                        <div class="q-switch askTheConfigEveryTime" data-v-47c639d4="">
                            <span class="q-switch__handle"></span>
                        </div>
                    </div>
                    `);

                    // 因为其他接口未申请 所以选择的点击事件我干脆就先不做了
                    // PS: Google翻译API我拒绝申请 DeepL的API因为目前不支持亚洲的信用卡 所以我在想办法整海外账户
                    // DeepL可以再等等 他们很快会开放亚洲用户的ProAPI、FreeAPI的注册

                    // insert all the data into the converterselect
                    let converterSelectSource = document.querySelector(`body > .BetterQQNTUtil > .dialog > #app > .setting-layout > .setting-main > .setting-main__content > .q-scroll-view > .common-tab > .panel-main.TranslatorSetting.SourceLang > select`);
                    Object.keys(allLangs.BaiduTranslateLang).forEach(key => {
                        converterSelectSource.insertAdjacentHTML(`beforeend`, `
                            <option value="${allLangs.BaiduTranslateLang[key].code}" style="background-color: var(--fill_light_primary);">${allLangs.BaiduTranslateLang[key].name}-${allLangs.BaiduTranslateLang[key].code}</option>
                        `);
                    });

                    let converterSelectTarget = document.querySelector(`body > .BetterQQNTUtil > .dialog > #app > .setting-layout > .setting-main > .setting-main__content > .q-scroll-view > .common-tab > .panel-main.TranslatorSetting.TargetLang > select`);
                    Object.keys(allLangs.BaiduTranslateLang).forEach(key => {
                        if (allLangs.BaiduTranslateLang[key].code == `auto`) {
                            return;
                        }
                        converterSelectTarget.insertAdjacentHTML(`beforeend`, `
                            <option value="${allLangs.BaiduTranslateLang[key].code}" style="background-color: var(--fill_light_primary);">${allLangs.BaiduTranslateLang[key].name}-${allLangs.BaiduTranslateLang[key].code}</option>
                        `);
                    });

                    // add the event listener for the converterSelect
                    converterSelectSource.addEventListener(`change`, () => {
                        globalConfig.Translator.APIConfig.TranslateConfig.SourceLang = converterSelectSource.value;
                        setConfig(dataPath, globalConfig);
                    });
                    converterSelectTarget.addEventListener(`change`, () => {
                        globalConfig.Translator.APIConfig.TranslateConfig.TargetLang = converterSelectTarget.value;
                        setConfig(dataPath, globalConfig);
                    });

                    // askTheConfigEveryTime
                    let askTheConfigEveryTime = document.querySelector(`body > .BetterQQNTUtil > .dialog > #app > .setting-layout > .setting-main > .setting-main__content > .q-scroll-view > .common-tab > .panel-main.TranslatorSetting.AskConfigEveryTime > .q-switch`);
                    askTheConfigEveryTime.addEventListener(`click`, () => {
                        let currentStatus = askTheConfigEveryTime.getAttribute(`class`);
                        askTheConfigEveryTime.setAttribute(`class`, currentStatus.includes(`is-active`) ? `q-switch` : `q-switch is-active`);
                        globalConfig.Translator.APIConfig.TranslateConfig.AskConfigEveryTime = currentStatus.includes(`is-active`) ? false : true;
                        setConfig(dataPath, globalConfig);
                    });

                    // appid input
                    let appidInput = document.querySelector(`body > .BetterQQNTUtil > .dialog > #app > .setting-layout > .setting-main > .setting-main__content > .q-scroll-view > .common-tab > .panel-main.TranslatorSetting.Appid > .input`);
                    appidInput.addEventListener(`input`, () => {
                        globalConfig.Translator.APIConfig.BaiduAPI.Appid = appidInput.value;
                        setConfig(dataPath, globalConfig);
                    });
                    // secretkey input
                    let secretkeyInput = document.querySelector(`body > .BetterQQNTUtil > .dialog > #app > .setting-layout > .setting-main > .setting-main__content > .q-scroll-view > .common-tab > .panel-main.TranslatorSetting.SecretKey > .input`);
                    secretkeyInput.addEventListener(`input`, () => {
                        globalConfig.Translator.APIConfig.BaiduAPI.SecretKey = secretkeyInput.value;
                        setConfig(dataPath, globalConfig);
                    });

                    Object.keys(globalConfig.Translator.APIConfig).forEach((key) => {
                        if (key == "BaiduAPI") {
                            // appid input
                            appidInput.value = globalConfig.Translator.APIConfig.BaiduAPI.Appid;
                            // secretkey input
                            secretkeyInput.value = globalConfig.Translator.APIConfig.BaiduAPI.SecretKey;
                        }

                        if (key == "TranslateConfig") {
                            // converterSelectSource
                            converterSelectSource.value = globalConfig.Translator.APIConfig.TranslateConfig.SourceLang;
                            // converterSelectTarget
                            converterSelectTarget.value = globalConfig.Translator.APIConfig.TranslateConfig.TargetLang;
                            // askTheConfigEveryTime
                            askTheConfigEveryTime.setAttribute(`class`, globalConfig.Translator.APIConfig.TranslateConfig.AskConfigEveryTime ? `q-switch is-active` : `q-switch`);
                        }
                    });
                }

                if (key == "RemoveRedPoint") {
                    chatPage.insertAdjacentHTML(`beforeend`, `
                    <div class="setting-item-title RemoveRedPoint" data-v-526bdad1="" style="padding-top:8px;" data-v-ac5f0656="">移除红点设置</div>
                    <div class="panel-main RemoveRedPoint RemoveAllRedPoint" style="margin-bottom: 0px;" data-v-47c639d4="">
                        <div data-v-47c639d4="">
                            <div class="text" data-v-47c639d4="">移除所有的红点</div>
                            <div class="tips" data-v-47c639d4="">移除所有的红点 包括消息中的红点</div>
                        </div>
                        <div class="q-switch RemoveAllRedPoint" data-v-47c639d4="">
                            <span class="q-switch__handle"></span>
                        </div>
                    </div>
                    `);

                    // RemoveAllRedPoint
                    let RemoveAllRedPoint = document.querySelector(`body > .BetterQQNTUtil > .dialog > #app > .setting-layout > .setting-main > .setting-main__content > .q-scroll-view > .common-tab > .panel-main.RemoveAllRedPoint > .q-switch`);
                    RemoveAllRedPoint.addEventListener(`click`, () => {
                        let currentStatus = RemoveAllRedPoint.getAttribute(`class`);
                        RemoveAllRedPoint.setAttribute(`class`, currentStatus.includes(`is-active`) ? `q-switch` : `q-switch is-active`);
                        globalConfig.RemoveRedPoint.RemoveAllRedPoint = currentStatus.includes(`is-active`) ? false : true;
                        setConfig(dataPath, globalConfig);
                    });

                    if (globalConfig.RemoveRedPoint.RemoveAllRedPoint) {
                        RemoveAllRedPoint.setAttribute(`class`, `q-switch is-active`);
                    }
                }

                if (key == "CustomNavBar") {
                    chatPage.insertAdjacentHTML(`beforeend`, `
                    <div class="setting-item-title CustomNavBar" data-v-526bdad1="" style="padding-top:8px;" data-v-4aa65e04>自定义侧边导航栏</div>
                    <div class="chat-page CustomNavBar Items" style="margin-bottom: 0px;" data-v-4aa65e04>
                        <div class="chat-page__item CustomNavBar Message" data-v-4aa65e04>
                            <span data-v-4aa65e04>消息</span>
                            <div class="q-switch" data-v-4aa65e04>
                                <span class="q-switch__handle"></span>
                            </div>
                        </div>
                        <div class="chat-page__item CustomNavBar Contacts" data-v-4aa65e04>
                            <span data-v-4aa65e04>联系人</span>
                            <div class="q-switch" data-v-4aa65e04>
                                <span class="q-switch__handle"></span>
                            </div>
                        </div>
                        <div class="chat-page__item CustomNavBar QQspace" data-v-4aa65e04>
                            <span data-v-4aa65e04>QQ空间</span>
                            <div class="q-switch" data-v-4aa65e04>
                                <span class="q-switch__handle"></span>
                            </div>
                        </div>
                        <div class="chat-page__item CustomNavBar QQchannel" data-v-4aa65e04>
                            <span data-v-4aa65e04>QQ频道</span>
                            <div class="q-switch" data-v-4aa65e04>
                                <span class="q-switch__handle"></span>
                            </div>
                        </div>
                        <div class="chat-page__item CustomNavBar QQGame" data-v-4aa65e04>
                            <span data-v-4aa65e04>QQ游戏中心</span>
                            <div class="q-switch" data-v-4aa65e04>
                                <span class="q-switch__handle"></span>
                            </div>
                        </div>
                        <div class="chat-page__item CustomNavBar QQworld" data-v-4aa65e04>
                            <span data-v-4aa65e04>QQ小世界</span>
                            <div class="q-switch" data-v-4aa65e04>
                                <span class="q-switch__handle"></span>
                            </div>
                        </div>
                        <div class="chat-page__item CustomNavBar TencentDocs" data-v-4aa65e04>
                            <span data-v-4aa65e04>腾讯文档</span>
                            <div class="q-switch" data-v-4aa65e04>
                                <span class="q-switch__handle"></span>
                            </div>
                        </div>
                    </div>
                    `);

                    Object.keys(globalConfig.CustomNavBar.delete).forEach((key) => {
                        let qswitch = chatPage.querySelector(`.chat-page.CustomNavBar.Items > .chat-page__item.CustomNavBar.${key} > .q-switch`);
                        qswitch.addEventListener(`click`, () => {
                            let currentStatus = qswitch.getAttribute(`class`);
                            qswitch.setAttribute(`class`, currentStatus.includes(`is-active`) ? `q-switch` : `q-switch is-active`);
                            globalConfig.CustomNavBar.delete[key] = currentStatus.includes(`is-active`) ? false : true;
                            setConfig(dataPath, globalConfig);
                        });

                        if (globalConfig.CustomNavBar.delete[key]) {
                            qswitch.setAttribute(`class`, `q-switch is-active`);
                        }
                    });
                }

                if (key == "Reload") {
                    chatPage.insertAdjacentHTML(`beforeend`, `
                    <div class="setting-item-title Reload" style="padding-top:10px" data-v-526bdad1="" data-v-ac5f0656="">刷新设置</div>
                    <div class="panel-main Reload HotKey" style="margin-bottom: 0px;" data-v-47c639d4="">
                        <div data-v-47c639d4="">
                            <div class="text" data-v-47c639d4="">刷新热键</div>
                            <div class="tips" data-v-47c639d4="">您可以特点通过热键来进行刷新</div>
                        </div>
                        <input class="input" type="text" spellcheck="false" placeholder="${globalConfig["Reload"].hotKey}" style="color: white;border-bottom-style: groove;appearance: none;box-sizing: border-box;background: none;">
                    </div>
                    <div class="panel-main Reload Interval" style="margin-bottom: 0px;" data-v-47c639d4="">
                        <div data-v-47c639d4="">
                            <div class="text" data-v-47c639d4="">延迟刷新</div>
                            <div class="tips" data-v-47c639d4="">刷新任务将在 ${globalConfig["Reload"].interval} 毫秒后运行</div>
                        </div>
                        <input class="input" type="text" spellcheck="false" placeholder="${globalConfig["Reload"].interval}" style="color: white;border-bottom-style: groove;appearance: none;box-sizing: border-box;background: none;">
                    </div>
                    `);

                    // input change
                    let hotKeyInput = chatPage.querySelector(`.panel-main.Reload.HotKey > .input`);
                    hotKeyInput.addEventListener(`keydown`, (e) => {
                        hotKeyInput.value = e.key;
                        globalConfig["Reload"].hotKey = e.key;
                        setConfig(dataPath, globalConfig);
                    });

                    // 监听 Interval 输入事件
                    let IntervalInput = chatPage.querySelector(`.panel-main.Reload.Interval > .input`);
                    IntervalInput.addEventListener(`input`, () => {
                        IntervalInput.setAttribute(`placeholder`, `${IntervalInput.value}`);
                        globalConfig["Reload"].interval = IntervalInput.value;
                        setConfig(dataPath, globalConfig);
                    });
                }

                if (key == "AudioVideoAssistant") {
                    // TODO
                }

                if (key == "BetterConsole") {
                    // TODO
                }

                if (key == "AutoUpdate") {
                    let lv = globalConfig.AutoUpdate.Version.localVersion;
                    let gv = globalConfig.AutoUpdate.Version.globalVersion;
                    let lct = globalConfig.AutoUpdate.Version.lastCheckTime;

                    chatPage.insertAdjacentHTML(`beforeend`, `
                    <div class="setting-item-title CheckUpdate" style="padding-top:10px" data-v-526bdad1="" data-v-ac5f0656="">检查更新</div>
                    <div class="panel-main CheckUpdate" style="margin-bottom: 0px;" data-v-47c639d4="">
                        <div data-v-47c639d4="">
                            <div class="text" data-v-47c639d4="">检查BetterQQNTUtil的版本是否处于最新版</div>
                            <div class="tips" data-v-47c639d4="">当前版本: ${lv}, 最新版本:${gv}, 检查于:${lct}</div>
                        </div>
                        <div class="ops-btns" data-v-3a6951a2="">
                            <button id="checkupdate" class="q-button q-button--secondary q-button--small" aria-busy="false" data-v-3a6951a2="" aria-disabled="false">
                                <span class="q-button__slot-warp">检查更新</span>
                            </button>
                        </div>
                    </div>
                    `);

                    // checkupdate
                    let checkupdate = chatPage.querySelector(`.panel-main.CheckUpdate > .ops-btns > #checkupdate`);
                    checkupdate.addEventListener(`click`, () => {
                        checkUpdate();
                        let { need, msg, level } = needUpdate(lv, gv);
                        if (need) {
                            if (lv == undefined || gv == undefined) {
                                dropMessage(`${msg}`, `${level}`);
                                return;
                            }
                            dropMessage(`${msg}, 版本号:${globalConfig.AutoUpdate.Version.globalVersion}, 请前往Github下载`, `success`);
                        } else {
                            dropMessage(`${msg}`, `${level}`);
                        }

                        // tips
                        let tips = chatPage.querySelector(`.panel-main.CheckUpdate > div > .tips`);
                        tips.innerText = `当前版本: ${globalConfig.AutoUpdate.Version.localVersion}, 最新版本:${globalConfig.AutoUpdate.Version.globalVersion}, 检查于:${globalConfig.AutoUpdate.Version.lastCheckTime}`;
                        setConfig(dataPath, globalConfig);
                    });
                }
            }
        });

        let panelMain = chatPage.querySelectorAll(`.panel-main`);
        if (panelMain.length == 0) {
            chatPage.insertAdjacentHTML(`beforeend`, `
            <div class="panel-main" style="margin-bottom: 8px;" data-v-47c639d4="">
                <div data-v-47c639d4="">
                    <div class="text" data-v-47c639d4="">没有需要修改配置的插件启用中</div>
                    <div class="tips" data-v-47c639d4="">您可以回到通用页面去启动例如 '翻译器、移除红点' 等需要修改配置的插件然后再返回查看此页面</div>
                </div>
            </div>
            `);
        }
    }

    if (page == `mainPage`) {
        mainPageAction();
    } else if (page == `settingPage`) {
        settingPageAction();
    }

    opacityAnimation(document.querySelector(`body > .BetterQQNTUtil > .dialog > #app > .setting-layout > .setting-main > .setting-main__content`), 0.5, true);
}

/**
 * 添加开关选项开启后的内容
 * @param {string} key 键值
 */
function addButtonAction(key) {
    if (key == "DebugMode") {
        document.querySelector(`body > .BetterQQNTUtil > .dialog > #app > .setting-layout > .setting-main > .setting-main__content > .q-scroll-view > .common-tab > .panel-main.enable-Reload`)
            .setAttribute(`style`, `margin-bottom: 8px;`);
        document.querySelector(`body > .BetterQQNTUtil > .dialog > #app > .setting-layout > .setting-main > .setting-main__content > .q-scroll-view > .common-tab > .panel-main.enable-BetterConsole`)
            .setAttribute(`style`, `margin-bottom: 8px;`);
    }
}

/**
 * 删除开关选项开启后的内容
 * @param {string} key 键值
 */
function removeButtonAction(key) {
    if (key == "DebugMode") {
        document.querySelector(`body > .BetterQQNTUtil > .dialog > #app > .setting-layout > .setting-main > .setting-main__content > .q-scroll-view > .common-tab > .panel-main.enable-Reload`)
            .setAttribute(`style`, `display:none;`);
        document.querySelector(`body > .BetterQQNTUtil > .dialog > #app > .setting-layout > .setting-main > .setting-main__content > .q-scroll-view > .common-tab > .panel-main.enable-BetterConsole`)
            .setAttribute(`style`, `display:none;`);

        dropMessage(`DebogMode已关闭, 相关功能都已取消勾选`, `success`);

        // 设置qswitch
        let reloadSwitch = document.querySelector(`body > .BetterQQNTUtil > .dialog > #app > .setting-layout > .setting-main > .setting-main__content > .q-scroll-view > .common-tab > .panel-main.enable-Reload > .q-switch`);
        reloadSwitch.setAttribute(`class`, `q-switch`);
        // BetterConsole switch
        let BetterConsoleSwitch = document.querySelector(`body > .BetterQQNTUtil > .dialog > #app > .setting-layout > .setting-main > .setting-main__content > .q-scroll-view > .common-tab > .panel-main.enable-BetterConsole > .q-switch`);
        BetterConsoleSwitch.setAttribute(`class`, `q-switch`);
        // 关闭config的enable
        globalConfig["Reload"].enable = false;
        globalConfig["BetterConsole"].enable = false;
        // save
        setConfig(dataPath, globalConfig);
    }
}

/**
 * 导航栏点击事件
 * @param {object} navBar 导航栏
 */
function navBarClickEvent(navBars, settingMainContent) {
    navBars = navBars.querySelectorAll(`.nav-item`);
    // 获取当前处于 nav-item-active 的导航栏
    let activeNavBar;
    navBars.forEach(navBar => {
        if (navBar.getAttribute(`class`).includes(`nav-item-active`)) {
            activeNavBar = navBar;
        }
    });

    navBars.forEach(navBar => {
        // 为所有导航栏添加点击事件
        navBar.addEventListener('click', () => {
            if (activeNavBar == navBar) {
                return;
            }

            // 设置上一次点击的导航栏为非激活状态
            activeNavBar.setAttribute(`class`, `nav-item`);
            // 设置此次点击的导航栏为激活状态
            navBar.setAttribute(`class`, `nav-item nav-item-active`);

            // 获取navBar的id
            let navBarId = navBar.getAttribute(`id`);
            activeNavBar = navBar;
            opacityAnimation(settingMainContent, 0.3, false);
            insertUtilPage(navBarId);
        });
    });
}

/**
 * to insert the translate button
 * @param {object} qContextMenu 
 * @param {object} target
 */
function addMenuButton(qContextMenu, target) {
    let separate_line = qContextMenu.querySelector(`.q-context-menu-separator.g`);
    if (!separate_line) {
        // add the separate-line
        qContextMenu.insertAdjacentHTML('beforeend', `<div class="q-context-menu-separator g" role="separator"></div>`);
    }

    if (globalConfig.Translator.enable) {
        // add the translate button
        qContextMenu.insertAdjacentHTML('beforeend', `
        <a id="translator" class="q-context-menu-item q-context-menu-item--normal" aria-disabled="false" role="menuitem" tabindex="-1">
            <div class="q-context-menu-item__icon q-context-menu-item__head">
                <i class="q-icon" data-v-717ec976="" style="--b4589f60: inherit; --6ef2e80d: 16px;">
                    <svg t="1689517218425" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3397" width="200" height="200">
                        <path d="M658.304 402.304h292.672c40.32 0 73.024 32.512 73.024 73.216v475.328A72.96 72.96 0 0 1 951.04 1024H475.52c-40.384 0-73.216-32.512-73.216-73.152v-292.48h146.368a109.44 109.44 0 0 0 109.632-109.696V402.304zM0 73.152C0 32.832 32.512 0 73.152 0H548.48c40.384 0 73.024 32.512 73.024 73.152V548.48c0 40.384-32.512 73.024-72.96 73.024H73.088A72.96 72.96 0 0 1 0 548.544V73.088z m146.304 315.648h53.376v-28.288h76.992v135.232h56.64V360.512h78.592v23.68h58.048V205.056H333.184V165.76c0-11.52 1.536-21.504 4.672-29.76a11.456 11.456 0 0 0 1.6-4.864c0-1.024-3.712-1.984-11.008-3.2h-53.504v77.056H146.176v183.872h0.128zM199.68 248.96h76.992v69.12H199.808l-0.128-69.12z m212.224 69.12H333.312v-69.12h78.592v69.12z m232.896 557.696l22.08-61.376h114.688l21.952 61.376h62.912l-102.144-290.688h-73.856l-105.28 290.816 59.648-0.128z m37.76-109.952l42.368-124.16h1.6l39.36 124.16h-83.328z m268.288-473.408h-73.152a146.112 146.112 0 0 0-146.368-146.176V73.152a219.456 219.456 0 0 1 219.52 219.328zM73.152 731.328h73.152a146.24 146.24 0 0 0 146.176 146.368v72.96a219.264 219.264 0 0 1-219.328-219.328z" fill="#FFFFFF" p-id="3398">
                        </path>
                    </svg>
                </i>
            </div>
            <span class="q-context-menu-item__text">翻译</span>
        </a>`);

        qContextMenu.querySelector(`#translator`).addEventListener(`click`, () => {
            qContextMenu.remove();
            ContentAnalyst(target, `Translator`);
        });

    }
    if (globalConfig.PlusOne.enable) {
        // add the translate button
        qContextMenu.insertAdjacentHTML('beforeend', `
        <a id="plusone" class="q-context-menu-item q-context-menu-item--normal" aria-disabled="false" role="menuitem" tabindex="-1">
            <div class="q-context-menu-item__icon q-context-menu-item__head">
                <i class="q-icon" data-v-717ec976="" style="--b4589f60: inherit; --6ef2e80d: 16px;">
                    <svg t="1690814818470" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2298" width="200" height="200">
                        <path d="M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z m0 921.6a409.6 409.6 0 1 1 409.6-409.6 409.6 409.6 0 0 1-409.6 409.6z" fill="#ffffff" p-id="2299"></path>
                        <path d="M716.8 460.8h-153.6V307.2a51.2 51.2 0 0 0-102.4 0v153.6H307.2a51.2 51.2 0 0 0 0 102.4h153.6v153.6a51.2 51.2 0 0 0 102.4 0v-153.6h153.6a51.2 51.2 0 0 0 0-102.4z" fill="#ffffff" p-id="2300"></path>
                    </svg>
                </i>
            </div>
            <span class="q-context-menu-item__text">加一</span>
        </a>`);

        qContextMenu.querySelector(`#plusone`).addEventListener(`click`, () => {
            qContextMenu.remove();
            ContentAnalyst(target, `plusone`);
        });
    }

    // fix the button rect
    const rect = qContextMenu.getBoundingClientRect();
    if (rect.bottom > window.innerHeight) {
        const menu = document.getElementById('qContextMenu');
        menu.style.top = `${window.innerHeight - rect.height - 10/* visual improve */}px`;
    }
}

/**
 * to analyst the target
 * @param {object} target the target needs to translate
 * @param {string} method the method of the plugin
 */
const ContentAnalyst = (target, method) => {
    // get the raw content
    const getRawText = (targetElement) => {
        const converted = targetElement.innerText.includes('\n\nTranslate:\n');
        let { innerText: rawText } = targetElement;
        if (converted) {
            // translate again
            rawText = rawText.match(/(\S*)\n\nTranslate:\n/)[1];
        }
        return rawText;
    }

    const text_Normal = target.querySelector('.text-normal');
    const targetElement = text_Normal ? text_Normal : target;

    const rawText = getRawText(targetElement);

    if (method == `translator`) {
        // translate
        targetElement.innerText = `${rawText}\n\nTranslate:\ntranslating...`;
        let url = getAPI(rawText, globalConfig.Translator.APIConfig.TranslateConfig.SourceLang, globalConfig.Translator.APIConfig.TranslateConfig.TargetLangLang);
        getAPIContent(url)
            .then((text) => {
                text = text.trans_result[0].dst;
                targetElement.innerText = `${rawText}\n\nTranslate:\n${text}`;
            })
            .catch((error) => {
                targetElement.innerText = `${rawText}\n\nTranslate:\n转换失败`;
                dropMessage(error);
            });
    } else if (method == `plusone`) {

    }
}

/**
 * get the api
 * @param {string} content the source content
 * @param {string} from the source language
 * @param {string} to the target language
 * @returns 
 */
function getAPI(content, from, to) {
    if (from == undefined) {
        from = 'auto'; // default
    }
    if (to == undefined) {
        to = 'zh'; // default
    }

    console.log(`[BetterQQ]: translating... \ncontent:${content}\nfrom:${from}\nto:${to}`);
    let appid = globalConfig.Translator.APIConfig.BaiduAPI.Appid;
    const salt = (new Date).getTime();
    let url = '';
    const str1 = appid + content + salt + globalConfig.Translator.APIConfig.BaiduAPI.SecretKey;
    const sign = MD5(str1);
    url = `http://api.fanyi.baidu.com/api/trans/vip/translate?q=${content}&from=${from}&to=${to}&appid=${appid}&salt=${salt}&sign=${sign}`
    return url;
}

/**
 * this function will get the content of the target api
 * @param {string} api the target api
 */
function getAPIContent(api) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', api);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(xhr.statusText);
                }
            }
        };
        xhr.onerror = function () {
            reject(xhr.statusText);
        };
        xhr.send();
    });
}

/**
 * the main function of the plugin
 * @returns no return
 */
function onLoad() {
    document.addEventListener('keydown', (e) => {
        if (e.key == globalConfig.BetterQQUtil.hotKey) {
            setTimeout(() => {
                let utilPage = document.querySelector(`body > .BetterQQNTUtil`);
                if (utilPage) {
                    let dialog = document.querySelector(`body > .BetterQQNTUtil > .dialog`);
                    opacityAnimation(dialog, 0.5, false, document.querySelector(`body > .BetterQQNTUtil`));
                } else {
                    insertUtilPage();
                }
            }, globalConfig["BetterQQUtil"].interval);
        }

        if (globalConfig["Reload"].enable) {
            if (e.key == globalConfig["Reload"].hotKey) {
                setTimeout(() => {
                    location.reload();
                }, globalConfig["Reload"].interval);
            }
        }
    });

    document.addEventListener('contextmenu', (event) => {
        if (globalConfig.Translator.enable || globalConfig.PlusOne.enable) {
            const target = event.target;
            const classList = target.classList;
            if (['text-normal', 'message-content', 'msg-content-container'].includes(classList[0])) {
                // right click menu
                const qContextMenu = document.querySelector('#qContextMenu');
                if (qContextMenu !== null) {
                    // insert the button
                    addMenuButton(qContextMenu, target);
                }
            }
        }
    });

    if (globalConfig.RemoveRedPoint.enable) {
        removeRedPoint(globalConfig.RemoveRedPoint.removeAllRedPoint);
    }

    if (globalConfig.RemoveUpdate.enable) {
        removeUpdate();
    }

    if (globalConfig.CustomNavBar.enable) {
        customNavBar();
    }

    if (globalConfig.AutoUpdate.enable) {
        let lv = globalConfig.AutoUpdate.Version.localVersion;
        let gv = globalConfig.AutoUpdate.Version.globalVersion;
        let { need, msg, level } = needUpdate(lv, gv);
        if (need) {
            if (lv == undefined || gv == undefined) {
                dropMessage(`${msg}, 请检查网络连接`, `${level}`);
                return;
            }
            dropMessage(`${msg} 当前版本:${lv} 最新版本:${globalConfig.AutoUpdate.Version.globalVersion}`);
        }
    }

    if (globalConfig.BetterConsole.enable) {

    }

    if (globalConfig.LinkColorFix.enable) {
        linkColorFix();
    }

    const checkContainerExists = () => {
        let container = document.querySelector(`#app > .container > .draggable-view__container.sidebar > .sidebar-nav > .sidebar-wrapper > .sidebar__lower > .func-menu`);
        if(container){
            container.insertAdjacentHTML('afterbegin', `
            <div class="func-menu__item" item="[object Object]" data-v-600a75b6="" data-v-b4504c92="">
                <div id="" class="icon-item" data-v-681df9e4="" data-v-600a75b6="" bf-toolbar-item="" role="button" tabindex="-1" aria-label="BetterQQTool" style="--hover-color: var(--brand_standard);">
                    <i class="q-icon" data-v-717ec976="" data-v-681df9e4="" style="--b4589f60: var(--icon_primary); --6ef2e80d: 24px;">
                        <svg t="1691060731269" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2310" width="24" height="24">
                            <path d="M282.112 256.928c-13.12 13.216-30.624 20.512-49.28 20.512-18.624 0-36.16-7.296-49.312-20.512L150.624 223.904l98.624-99.04 32.896 33.024c13.184 13.216 20.48 30.816 20.48 49.536a69.6 69.6 0 0 1-20.512 49.472zM249.312 190.912H249.28L216.384 223.904a23.104 23.104 0 0 0 32.864 0.032 23.296 23.296 0 0 0 0.032-32.992z m147.392 208.736L249.568 257.216l32.288-33.632 147.168 142.464-32.32 33.6z m354.752 362.432l-133.344-140.128 32.896-32.992 133.344 140.128-32.896 32.992z m98.72 65.952a115.872 115.872 0 0 1-164.256 0.128l-147.744-154.592 32.896-33.024 147.744 154.624a69.632 69.632 0 0 0 98.496-0.16 70.464 70.464 0 0 0-0.128-99.2l-147.424-154.272 32.864-33.024 147.456 154.304a117.28 117.28 0 0 1 0.128 165.216z m-48.448-400.416a161.408 161.408 0 0 1-115.072 47.872c-43.456 0-84.32-16.992-115.072-47.872s-47.68-71.872-47.68-115.52 16.928-84.704 47.68-115.552l42.496-42.656 32.896 32.992-42.496 42.656a116.064 116.064 0 0 0-34.08 82.56c0 31.168 12.096 60.448 34.08 82.496s51.168 34.208 82.208 34.208c31.072 0 60.256-12.128 82.208-34.208l42.496-42.656 32.896 33.024-42.496 42.656z m42.496-42.656l-49.312-49.504-16.448 16.48a92.064 92.064 0 0 1-65.728 27.36h-0.032a92.128 92.128 0 0 1-65.728-27.36c-17.536-17.6-27.264-41.088-27.264-66.016s9.664-48.416 27.264-66.048l16.448-16.512-49.344-49.504 32.896-33.024 82.208 82.528-49.312 49.472a46.656 46.656 0 0 0-13.632 33.056c0 12.448 4.864 24.192 13.632 32.992s20.448 13.696 32.896 13.696c12.416 0 24.096-4.864 32.864-13.696l49.344-49.504 82.208 82.528-32.896 33.024zM233.6 766.848v-46.688h46.528v46.688H233.6z m304.576-227.392l-92.256-91.584 32.704-33.184 92.224 91.552-32.672 33.216z m-233.952 255.488l173.632-239.84 37.632 27.456-177.184 244.192a115.2 115.2 0 0 1-82.208 34.208c-31.04 0-60.224-12.16-82.208-34.176-21.952-22.048-34.08-51.328-34.08-82.528s12.096-60.48 34.08-82.528l2.752-2.368 240.544-175.424 27.36 37.728-239.008 174.304a69.568 69.568 0 0 0-19.232 48.256c0 18.72 7.264 36.288 20.448 49.504 25.952 26.08 70.976 26.528 97.408 1.184z" p-id="2311" fill="#AFFFF5FF"></path>
                        </svg>
                    </i>
                </div>
            </div>
            <div class="separator" style="width: 41px;height: 1px;background: #F2F2F232;margin-left: 9px;padding-top: 3px;position: absolute;bottom: 165px;"></div>
            `);
            let iconItem = document.querySelector(`#app > .container > .draggable-view__container.sidebar > .sidebar-nav > .sidebar-wrapper > .sidebar__lower > .func-menu > .func-menu__item`);

            iconItem.addEventListener(`click`, () => {
                insertUtilPage();
            });
            clearInterval(intervalId);
        }
    };

    const intervalId = setInterval(checkContainerExists, 300);
}

/**
 * link color fix
 */
function linkColorFix() {
    // 其实就是获取所有的css style值
    // 然后寻找 .q-theme-tokens-dark 也就是dark皮肤的css style样式
    // 然后在寻找他之下的 --text_link css style属性 修改成白色了 (之后会添加修改成自己想要的颜色 qwq)
    var styleSheets = document.styleSheets;

    Array.from(styleSheets).forEach(function (styleSheet) {
        var rules;
        try {
            rules = styleSheet.cssRules;
        } catch (error) {
            dropMessage(`CORSError: ${error}`, `error`);
            return;
        }

        Array.from(rules).forEach(function (rule) {
            if (rule.selectorText && rule.selectorText.includes(".q-theme-tokens-dark")) {
                Array.from(rule.style).forEach(function (declaration) {
                    if (declaration.includes("--text_link")) {
                        rule.style.setProperty("--text_link", "F2F2F2FF");
                        // dropMessage(`颜色修改成功 使用期间请不要切换皮肤 否则会导致功能失效`, `success`);
                    }
                });
            }
        });
    });
}

/**
 * 自定义侧边导航栏
 */
function customNavBar() {
    Object.keys(globalConfig.CustomNavBar.delete).forEach(key => {
        let nav_bar = document.querySelectorAll(`#app > .container > .draggable-view__container.sidebar > .sidebar-nav > .sidebar-wrapper > .sidebar__upper > .nav.sidebar__nav > .nav-item`);
        for (let i = 0; i < nav_bar.length; i++) {
            let label = nav_bar[i].getAttribute(`aria-label`);
            if (globalConfig.CustomNavBar.delete[key]) {
                if ((key == "Message" && label == "消息") ||
                    (key == "Contacts" && label == "联系人") ||
                    (key == "QQspace" && label == "空间") ||
                    (key == "QQchannel" && label == "频道") ||
                    (key == "QQworld" && label == "小世界") ||
                    (key == "QQGame" && label == "游戏中心")) {
                    nav_bar[i].remove();
                } else if (key == "TencentDocs" && nav_bar[i].getAttribute(`class`) == `tab-item nav-item`) {
                    nav_bar[i].remove();
                }
            }
        }
    });
}

/**
 * 消除更新
 */
function removeUpdate() {
    const bodyElement = document.body;
    const commentNodes = [];

    for (const node of bodyElement.childNodes) {
        if (node.nodeType === Node.COMMENT_NODE) {
            commentNodes.push(node);
        }
    }

    if (commentNodes.length == 5) {
        commentNodes[0].remove();
    } else if (commentNodes.length == 5) {
        let qdialog = document.querySelector('#app > .q-dialog');
        if (qdialog) {
            let dialogClassName = qdialog.getAttribute('class');
            if (dialogClassName == `update-dialog q-dialog-main`) {
                qdialog.remove();
            }
        }
    }
}

/**
 * 移除红点
 * @param {boolean} removeAllRedPoint 是否移除所有红点
 */
function removeRedPoint(removeAllRedPoint) {
    let nav_bar = document.querySelectorAll(`#app > .container > .draggable-view__container.sidebar > .sidebar-nav > .sidebar-wrapper > .sidebar__upper > .nav.sidebar__nav > .nav-item`);
    for (let i = 0; i < nav_bar.length; i++) {
        const targetElement = nav_bar[i].querySelector(`.q-badge.q-badge__red`);
        if (targetElement != null) {
            const commentNodes = [];

            for (const node of targetElement.childNodes) {
                if (node.nodeType === Node.COMMENT_NODE) {
                    commentNodes.push(node);
                }
            }

            if (i == 0 && !removeAllRedPoint) {
                continue;
            }

            if (commentNodes.length == 2) {
                commentNodes[0].remove();
            } else {
                let redPoint = nav_bar[i].querySelector(`.q-badge.q-badge__red > .q-badge-sub.q-badge-num.q-badge__red`);
                if (redPoint) redPoint.remove();
            }

            if (i == 3) {
                let redDot = nav_bar[i].querySelector(`.q-badge.q-badge__red > .q-badge-sub.q-badge-dot.q-badge-dot__large.q-badge__red`);
                if (redDot) redDot.remove();
            }
        }
    }
}

/**
 * drop a message toast
 * @param {string} msg the erroe message 
 * @param {string} level error or success
 */
function dropMessage(msg, level) {
    if (level == ``) {
        level = 'error'
    }
    let toast = document.querySelector(`body > .q-toast`); // == null
    if (toast == null) {
        // body
        let body = document.querySelector(`body`);
        if (level == 'error') {
            // insert the error toast
            body.insertAdjacentHTML(`beforeend`, `
            <div class="q-toast" type="error" content="${msg}" style="position: fixed; z-index: 5000; top: -60px; left: 0px; pointer-events: none;">
                <div class="q-toast-item q-toast-transition-item"><i class="q-icon" data-v-d3b28588="" style="--a9579e5e: #FF5967; --9845e828: 20px;"><svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM8.5 4.5V9.5H7.5V4.5H8.5ZM8.5 11.5V10.5H7.5V11.5H8.5Z"></path></svg></i>
                    <span>${msg}</span>
                </div>
            </div>
            `);
        } else if (level == 'success') {
            // insert the error toast
            body.insertAdjacentHTML(`beforeend`, `
            <div class="q-toast" content="${msg}" type="success" style="position: fixed; z-index: 5000; top: -60px; left: 0px; pointer-events: none;">
                <div class="q-toast-item q-toast-transition-item"><i class="q-icon" data-v-6f7890cb="" style="--729cb6f4: #15D173; --33f90017: 20px;"><svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5ZM7.45232 10.2991L11.3555 6.35155L10.6445 5.64845L7.08919 9.2441L5.22771 7.44087L4.53193 8.15913L6.74888 10.3067L7.10435 10.651L7.45232 10.2991Z"></path></svg></i>
                    <span>${msg}</span>
                </div>
            </div>
            `);
        }

        // set the toast animation
        let toast_ = document.querySelector(`body > .q-toast`); // != null
        moveDownAnimation(toast_, -60, 0, true, toast_);
    }
}

/**
 * let the element move form the start(top) to the end(top) in the time
 * @param {object} element the element that need to move
 * @param {int} start the start posistion of the element
 * @param {int} end the end position of the element
 * @param {boolean} remove does the element need to remove
 * @param {object} removeDiv the element that need to remove
 */
function moveDownAnimation(element, start, end, remove = false, removeDiv = null) {
    let top = start;
    let intervalId = setInterval(() => {
        top += 1;
        element.style.top = `${top}px`;
        if (top == end) {
            clearInterval(intervalId);
            setTimeout(() => {
                intervalId = setInterval(() => {
                    top -= 1;
                    element.style.top = `${top}px`;
                    if (top == start) {
                        clearInterval(intervalId);
                        if (remove) {
                            if (removeDiv != null) {
                                removeDiv.remove();
                            }
                        }
                    }
                }, 10);
            }, 3000);
        }
    }, 10);
}

/**
 * change the opacity of the element in the time
 * @param {object} element the element that need to change the opacity
 * @param {int} time the time of the animation
 * @param {boolean} show the result need to show or hide
 * @param {object} removeDiv the element that need to remove
 */
function opacityAnimation(element, time, show, removeDiv = null) {
    var duration = time * 1000;
    var interval = 10;
    var steps = duration / interval;
    var currentStep = 0;
    var opacityStep = 1 / steps;

    function animate() {
        if (!element) {
            return;
        }

        if (show) {
            currentStep++;
            var opacity = currentStep * opacityStep;

            element.style.opacity = opacity;
            if (currentStep < steps) {
                setTimeout(animate, interval);
            }
        } else {
            currentStep++;
            var opacity = 1 - (currentStep * opacityStep);
            element.style.opacity = opacity;
            if (currentStep < steps) {
                setTimeout(animate, interval);
            } else {
                if (removeDiv) {
                    removeDiv.remove();
                }
            }
        }
    }

    setTimeout(animate, interval);
}

export {
    onLoad,
}

const MD5 = (string) => {
    function RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    function AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    function F(x, y, z) { return (x & y) | ((~x) & z); }
    function G(x, y, z) { return (x & z) | (y & (~z)); }
    function H(x, y, z) { return (x ^ y ^ z); }
    function I(x, y, z) { return (y ^ (x | (~z))); }

    function FF(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function GG(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function HH(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function II(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };

    function WordToHex(lValue) {
        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    };

    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;

    string = Utf8Encode(string);

    x = ConvertToWordArray(string);

    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

    for (k = 0; k < x.length; k += 16) {
        AA = a; BB = b; CC = c; DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = AddUnsigned(a, AA);
        b = AddUnsigned(b, BB);
        c = AddUnsigned(c, CC);
        d = AddUnsigned(d, DD);
    }

    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

    return temp.toLowerCase();
}