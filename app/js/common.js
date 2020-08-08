//Preloader//
  var images              = document.images;
  var images_total_count  = images.length;
  var images_loaded_count = 0;
  var $preloader           = $('#page-preloader');//document.getElementById('page-preloader');
  var $perc_display        = $('#loadPerc');//document.getElementById('loadPerc');
  var perc_load           = 0;
  for( var i = 0; i < images_total_count; i++){
    imageClone          = new Image();
    imageClone.onload   = imageLoaded;
    imageClone.onerror  = imageLoaded;
    imageClone.src      = images[i].src;
  }
  function imageLoaded(){
    images_loaded_count++;
    perc_load = (((100/ images_total_count) * images_loaded_count) << 0) + "%";
    //perc_display.innerHTML = (((100/ images_total_count) * images_loaded_count)<<0) + "%";
    //document.getElementById('loader').serAttribute("style", "width:perc_load");
    $('#loader').css({'width':perc_load});
    if(images_loaded_count >= images_total_count) {
      setTimeout(function(){
        if(!$preloader.hasClass('done')){
          $preloader.addClass('done');
        }
        appearance();
      }, 1000);
    }
  }

//PARALLAX//
$( 'html' ).mousemove(function( event ){
  let centerX = $( 'body' ).width()/2;
  let centerY = $( 'body' ).height()/2;
  $('.firstPlan').css({"transform": "translate(" + (-(centerX + event.pageX)/1000) + "%," + (-(centerY + event.pageY)/1000) + "%)"});
});
//SCROLL//
let $currentSection;
let $indicator = $('.indicator');
let $section = $('section');
let $main = $('main');
let $body = $('body');
let totalSlideNumber = $section.length;
let scrollEnable = 1;
let slideDuration = 800;
let mobileScroll = 0;

const scrolling = (e) => {
  appearance();
  console.log('scrolling');
  if((scrollEnable === 1)&&(mobileScroll === 0)){
    scrollEnable = 0;
    let scrollDirection = e.originalEvent.wheelDelta > 0;
    let index = $('.activeSection').index();
    if (index == 0){
      index += scrollDirection?0:1;
    }else if (index == totalSlideNumber - 1){
      index += scrollDirection?-1:0;
    }else {
      index += scrollDirection?-1:1;
    }
    slide(index);
  }
}
$indicator.click(function(event){
  slide(this.getAttribute('index'));
});

const slide = (index) => {
  $currentSection = $section.eq(index);
  let windowHeight = $(window).height();
  let currentSectionHeight = $currentSection.height();
  let currentHeight;
  /*$('html, body').stop().animate({
      scrollTop: $currentSection.offset().top
    },slideDuration);*/
  if (index == 7) {
    currentHeight = windowHeight*(index - 1)*(-1) + currentSectionHeight*(-1);
  }else {
    currentHeight = windowHeight*(index)*(-1)
  }
  //console.log(windowHeight, currentSectionHeight, currentSectionHeight*index*(-1), index, currentHeight);
  $main.css({'top': +(currentHeight)});
  classActiveInd(index);
  classActiveSection();
  slideDurationTimeout(slideDuration);
  appearance();
}
const classActiveSection = () => {
  $section.removeClass('activeSection');
  $currentSection.addClass('activeSection');
}
const classActiveInd = (index) => {
  $indicator.removeClass('activeInd');
  $indicator.removeClass('activeIndWhite');
  if(index == 5 || index == 7){
    $indicator.eq($currentSection.index()).addClass('activeIndWhite');
  }else {
    $indicator.eq($currentSection.index()).addClass('activeInd');
  }
}
const slideDurationTimeout = (slideDuration) => {
  setTimeout(function() {
    scrollEnable = 1;
  }, slideDuration);
}
let body = document.getElementsByTagName('BODY')[0];
const mobileSize = () => {
  if ($( window ).width() < 770){
    mobileScroll = 1;
    slide(0);
    $body.css({'overflow-y':'auto'});
  }else {
    body.scrollIntoView();
    mobileScroll = 0;
    $body.css({'overflow-y':'hidden'});
  }
}
$( window ).resize(function() {
  mobileSize();
});
$( document ).ready(function(){
  console.log('asd12');
  mobileSize();
});
$(window).bind('mousewheel', scrolling);
/////////buttons///////
$('.aboutButton').click(function(){
  slide(1);
});
let $sideMenuNavigationButton = $('.sideMenuNavigationButton');
const navMenuButton = (button, index) => {
  slide(index);
  $sideMenuNavigationButton.removeClass('sideMenuNavigationButtonActive');
  $(button).addClass('sideMenuNavigationButtonActive');
}
$('#navAboutProject').click(function(){
  navMenuButton($(this), 1);
});
$('#navForGuests').click(function(){
  navMenuButton($(this), 2);
});
$('#navForMembers').click(function(){
  navMenuButton($(this), 3);
});
$('#navGallery').click(function(){
  navMenuButton($(this), 4);
});
$('#navForPress').click(function(){
  navMenuButton($(this), 5);
});
$('#navPartners').click(function(){
  navMenuButton($(this), 6);
});
$('#navContacts').click(function(){
  navMenuButton($(this), 7);
});
///////sideMenu////////
let $sideMenu = $('.sideMenu');
let $sideMenuSvg = $('.sideMenuCloseButton svg');
$('.menu').click(function(){
  $sideMenu.css({'right':'0px'});
  $sideMenuSvg.addClass('sideMenuCloseButtonSvgAnimation');
});
$('.sideMenuCloseButton').click(function(){
  $sideMenu.css({'right':'-350px'});
  $sideMenuSvg.removeClass('sideMenuCloseButtonSvgAnimation');
});
//////appearance///////
let $section_0 = $('#section_0');
let $section_1 = $('#section_1');
let $section_4 = $('#section_4');
let $section_5 = $('#section_5');
let $section_7 = $('#section_7');
let $firstPlan = $('.firstPlan');
let $section_1Conntent = $('.section_1Conntent');
let $aboutProjectH2 = $('.aboutProject>h2');
let $logoInSecondPage = $('.logoInSecondPage');
let $titleProject = $('.titleProject');
let $dateProject = $('.dateProject');
let $organizers = $('.organizers');
let $thematicContent = $('.thematicContent');
let $photoCard = $('.photoCard');
function appearance(){
  if($section_0.hasClass('activeSection')){
    $firstPlan.addClass('firstPlanAppearance');
  }
  if($section_1.hasClass('activeSection')){
    $section_1Conntent.addClass('section_1ConntentActive');
    $aboutProjectH2.addClass('appearanceToRight');
    $logoInSecondPage.addClass('appearanceToRight');
    $titleProject.addClass('appearanceToRight');
    $dateProject.addClass('appearanceToRight');
    $organizers.addClass('appearanceToTop');
    $thematicContent.addClass('appearanceToTop');
  }
  if($section_4.hasClass('activeSection')){
    $photoCard.addClass('appearanceToTop');
  }
  if($section_5.hasClass('activeSection') || $section_7.hasClass('activeSection')){
    $indicator.addClass('indicatorWhite');
  }else{
    $indicator.removeClass('indicatorWhite');
  }
}

$(window).scroll(function(){
  console.log('scrolling2');
  addAppearanceClass($section_1Conntent, 'section_1ConntentActive');
  addAppearanceClass($aboutProjectH2, 'appearanceToRight');
  addAppearanceClass($logoInSecondPage, 'appearanceToRight');
  addAppearanceClass($titleProject, 'appearanceToRight');
  addAppearanceClass($dateProject, 'appearanceToRight');
  addAppearanceClass($organizers, 'appearanceToTop');
  addAppearanceClass($thematicContent, 'appearanceToTop');
  addAppearanceClass($photoCard, 'appearanceToTop');
});
const addAppearanceClass = (element, clas) => {
  console.log('addAppearanceClass', $(window).scrollTop(), element.offset().top, clas);
  if ( $(window).scrollTop() > element.offset().top - 900) {
    element.addClass(clas);
  }
}
////ALBUM/////
let $albumPhotoCounter = $('#albumPhotoCounter');
let $albumPhotoTitle = $('#albumPhotoTitle');
let $albumViewer = $('.albumViewer');
let $photoCase = $('#photoCase');
$('.photoCard').click(function(){
  if($(this).attr('id') == 'photoCard_0'){
    $photoCase.attr({'src':'https://raw.githubusercontent.com/krpnkndrw/ArmsAndHunting/master/ArmsAndHunting2019_0.jpg'});
    albumTitle(0, 4, 2019);
  }
  else if($(this).attr('id') == 'photoCard_1'){
    $photoCase.attr({'src':'https://raw.githubusercontent.com/krpnkndrw/ArmsAndHunting/master/ArmsAndHunting2018_0.jpg'});
    albumTitle(0, 2, 2018);
  }
  $albumViewer.fadeIn();
});
const albumChange = (direction) => {
  let cnt = $albumPhotoCounter.attr('cnt');
  let n = $albumPhotoCounter.attr('n');
  let year = $albumPhotoCounter.attr('year');
  if (direction == 'right'){
    cnt = (+cnt == n)?0:(+cnt +1);
  } else if (direction == 'left'){
    cnt = (+cnt == 0)?n:(+cnt -1);
  }
  $photoCase.attr({'src':'https://raw.githubusercontent.com/krpnkndrw/ArmsAndHunting/master/ArmsAndHunting'+year+'_'+cnt+'.jpg'});
  albumTitle(cnt, n, year);
}
$('#albumArrowRight').click(function(){
  albumChange('right');
});
$('#albumArrowLeft').click(function(){
  albumChange('left');
});
const albumTitle = (cnt, n, year) => {
  $albumPhotoCounter.text(cnt+'/'+ n).attr({'cnt':cnt, 'n':n, 'year':year});
  $albumPhotoTitle.text('Arms and hunting '+year+' ' +cnt);
}
$('#albumClose').click(function(){
  $albumViewer.fadeOut();
  $photoCase.attr({'src':''});
});
$albumViewer.fadeOut();
/////MAP/////
/*ymaps.ready(function(){*/
setTimeout(function(){ //поставил таймер, чтобы, пока пользователь находится на секциях с фоном, парралакс работал.
  console.log(
    'Параллакс багует из-за яндекс карты. Если подождать с выключенным DevTools, то он отвиснет и станет плавным. Если сдвинуть карту, то параллакс опять подвиснет на секунд 20. Как фиксить я пока не понял.'
  );
    var myMap = new ymaps.Map("map", {
        center: [55.753613, 37.626034],
        zoom: 16
    });
    myMap.controls.remove('zoomControl');
    myMap.controls.remove('geolocationControl');
    myMap.controls.remove('searchControl');
    myMap.controls.remove('trafficControl');
    myMap.controls.remove('typeSelector');
    myMap.controls.remove('fullscreenControl');
    myMap.controls.remove('rulerControl');
    myMap.controls.remove('fullscreenControl');
  }, 25000
);
