;if(typeof jQuery==='undefined'){throw new Error('Bootstrap\'s JavaScript requires jQuery')}
+function($){'use strict';function transitionEnd(){var el=document.createElement('bootstrap')
var transEndEventNames={WebkitTransition:'webkitTransitionEnd',MozTransition:'transitionend',OTransition:'oTransitionEnd otransitionend',transition:'transitionend'}
for(var name in transEndEventNames){if(el.style[name]!==undefined){return{end:transEndEventNames[name]}}}
return false}
$.fn.emulateTransitionEnd=function(duration){var called=false
var $el=this
$(this).one('bsTransitionEnd',function(){called=true})
var callback=function(){if(!called)$($el).trigger($.support.transition.end)}
setTimeout(callback,duration)
return this}
$(function(){$.support.transition=transitionEnd()
if(!$.support.transition)return
$.event.special.bsTransitionEnd={bindType:$.support.transition.end,delegateType:$.support.transition.end,handle:function(e){if($(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}}})}(jQuery);+function($){'use strict';var dismiss='[data-dismiss="alert"]'
var Alert=function(el){$(el).on('click',dismiss,this.close)}
Alert.VERSION='3.2.0'
Alert.prototype.close=function(e){var $this=$(this)
var selector=$this.attr('data-target')
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
var $parent=$(selector)
if(e)e.preventDefault()
if(!$parent.length){$parent=$this.hasClass('alert')?$this:$this.parent()}
$parent.trigger(e=$.Event('close.bs.alert'))
if(e.isDefaultPrevented())return
$parent.removeClass('in')
function removeElement(){$parent.detach().trigger('closed.bs.alert').remove()}
$.support.transition&&$parent.hasClass('fade')?$parent.one('bsTransitionEnd',removeElement).emulateTransitionEnd(150):removeElement()}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.alert')
if(!data)$this.data('bs.alert',(data=new Alert(this)))
if(typeof option=='string')data[option].call($this)})}
var old=$.fn.alert
$.fn.alert=Plugin
$.fn.alert.Constructor=Alert
$.fn.alert.noConflict=function(){$.fn.alert=old
return this}
$(document).on('click.bs.alert.data-api',dismiss,Alert.prototype.close)}(jQuery);+function($){'use strict';var Button=function(element,options){this.$element=$(element)
this.options=$.extend({},Button.DEFAULTS,options)
this.isLoading=false}
Button.VERSION='3.2.0'
Button.DEFAULTS={loadingText:'loading...'}
Button.prototype.setState=function(state){var d='disabled'
var $el=this.$element
var val=$el.is('input')?'val':'html'
var data=$el.data()
state=state+'Text'
if(data.resetText==null)$el.data('resetText',$el[val]())
$el[val](data[state]==null?this.options[state]:data[state])
setTimeout($.proxy(function(){if(state=='loadingText'){this.isLoading=true
$el.addClass(d).attr(d,d)}else if(this.isLoading){this.isLoading=false
$el.removeClass(d).removeAttr(d)}},this),0)}
Button.prototype.toggle=function(){var changed=true
var $parent=this.$element.closest('[data-toggle="buttons"]')
if($parent.length){var $input=this.$element.find('input')
if($input.prop('type')=='radio'){if($input.prop('checked')&&this.$element.hasClass('active'))changed=false
else $parent.find('.active').removeClass('active')}
if(changed)$input.prop('checked',!this.$element.hasClass('active')).trigger('change')}
if(changed)this.$element.toggleClass('active')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.button')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.button',(data=new Button(this,options)))
if(option=='toggle')data.toggle()
else if(option)data.setState(option)})}
var old=$.fn.button
$.fn.button=Plugin
$.fn.button.Constructor=Button
$.fn.button.noConflict=function(){$.fn.button=old
return this}
$(document).on('click.bs.button.data-api','[data-toggle^="button"]',function(e){var $btn=$(e.target)
if(!$btn.hasClass('btn'))$btn=$btn.closest('.btn')
Plugin.call($btn,'toggle')
e.preventDefault()})}(jQuery);+function($){'use strict';var Carousel=function(element,options){this.$element=$(element).on('keydown.bs.carousel',$.proxy(this.keydown,this))
this.$indicators=this.$element.find('.carousel-indicators')
this.options=options
this.paused=this.sliding=this.interval=this.$active=this.$items=null
this.options.pause=='hover'&&this.$element.on('mouseenter.bs.carousel',$.proxy(this.pause,this)).on('mouseleave.bs.carousel',$.proxy(this.cycle,this))}
Carousel.VERSION='3.2.0'
Carousel.DEFAULTS={interval:5000,pause:'hover',wrap:true}
Carousel.prototype.keydown=function(e){switch(e.which){case 37:this.prev();break
case 39:this.next();break
default:return}
e.preventDefault()}
Carousel.prototype.cycle=function(e){e||(this.paused=false)
this.interval&&clearInterval(this.interval)
this.options.interval&&!this.paused&&(this.interval=setInterval($.proxy(this.next,this),this.options.interval))
return this}
Carousel.prototype.getItemIndex=function(item){this.$items=item.parent().children('.item')
return this.$items.index(item||this.$active)}
Carousel.prototype.to=function(pos){var that=this
var activeIndex=this.getItemIndex(this.$active=this.$element.find('.item.active'))
if(pos>(this.$items.length-1)||pos<0)return
if(this.sliding)return this.$element.one('slid.bs.carousel',function(){that.to(pos)})
if(activeIndex==pos)return this.pause().cycle()
return this.slide(pos>activeIndex?'next':'prev',$(this.$items[pos]))}
Carousel.prototype.pause=function(e){e||(this.paused=true)
if(this.$element.find('.next, .prev').length&&$.support.transition){this.$element.trigger($.support.transition.end)
this.cycle(true)}
this.interval=clearInterval(this.interval)
return this}
Carousel.prototype.next=function(){if(this.sliding)return
return this.slide('next')}
Carousel.prototype.prev=function(){if(this.sliding)return
return this.slide('prev')}
Carousel.prototype.slide=function(type,next){var $active=this.$element.find('.item.active')
var $next=next||$active[type]()
var isCycling=this.interval
var direction=type=='next'?'left':'right'
var fallback=type=='next'?'first':'last'
var that=this
if(!$next.length){if(!this.options.wrap)return
$next=this.$element.find('.item')[fallback]()}
if($next.hasClass('active'))return(this.sliding=false)
var relatedTarget=$next[0]
var slideEvent=$.Event('slide.bs.carousel',{relatedTarget:relatedTarget,direction:direction})
this.$element.trigger(slideEvent)
if(slideEvent.isDefaultPrevented())return
this.sliding=true
isCycling&&this.pause()
if(this.$indicators.length){this.$indicators.find('.active').removeClass('active')
var $nextIndicator=$(this.$indicators.children()[this.getItemIndex($next)])
$nextIndicator&&$nextIndicator.addClass('active')}
var slidEvent=$.Event('slid.bs.carousel',{relatedTarget:relatedTarget,direction:direction})
if($.support.transition&&this.$element.hasClass('slide')){$next.addClass(type)
$next[0].offsetWidth
$active.addClass(direction)
$next.addClass(direction)
$active.one('bsTransitionEnd',function(){$next.removeClass([type,direction].join(' ')).addClass('active')
$active.removeClass(['active',direction].join(' '))
that.sliding=false
setTimeout(function(){that.$element.trigger(slidEvent)},0)}).emulateTransitionEnd($active.css('transition-duration').slice(0,-1)*1000)}else{$active.removeClass('active')
$next.addClass('active')
this.sliding=false
this.$element.trigger(slidEvent)}
isCycling&&this.cycle()
return this}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.carousel')
var options=$.extend({},Carousel.DEFAULTS,$this.data(),typeof option=='object'&&option)
var action=typeof option=='string'?option:options.slide
if(!data)$this.data('bs.carousel',(data=new Carousel(this,options)))
if(typeof option=='number')data.to(option)
else if(action)data[action]()
else if(options.interval)data.pause().cycle()})}
var old=$.fn.carousel
$.fn.carousel=Plugin
$.fn.carousel.Constructor=Carousel
$.fn.carousel.noConflict=function(){$.fn.carousel=old
return this}
$(document).on('click.bs.carousel.data-api','[data-slide], [data-slide-to]',function(e){var href
var $this=$(this)
var $target=$($this.attr('data-target')||(href=$this.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,''))
if(!$target.hasClass('carousel'))return
var options=$.extend({},$target.data(),$this.data())
var slideIndex=$this.attr('data-slide-to')
if(slideIndex)options.interval=false
Plugin.call($target,options)
if(slideIndex){$target.data('bs.carousel').to(slideIndex)}
e.preventDefault()})
$(window).on('load',function(){$('[data-ride="carousel"]').each(function(){var $carousel=$(this)
Plugin.call($carousel,$carousel.data())})})}(jQuery);+function($){'use strict';var Collapse=function(element,options){this.$element=$(element)
this.options=$.extend({},Collapse.DEFAULTS,options)
this.transitioning=null
if(this.options.parent)this.$parent=$(this.options.parent)
if(this.options.toggle)this.toggle()}
Collapse.VERSION='3.2.0'
Collapse.DEFAULTS={toggle:true}
Collapse.prototype.dimension=function(){var hasWidth=this.$element.hasClass('width')
return hasWidth?'width':'height'}
Collapse.prototype.show=function(){if(this.transitioning||this.$element.hasClass('in'))return
var startEvent=$.Event('show.bs.collapse')
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
var actives=this.$parent&&this.$parent.find('> .panel > .in')
if(actives&&actives.length){var hasData=actives.data('bs.collapse')
if(hasData&&hasData.transitioning)return
Plugin.call(actives,'hide')
hasData||actives.data('bs.collapse',null)}
var dimension=this.dimension()
this.$element.removeClass('collapse').addClass('collapsing')[dimension](0)
this.transitioning=1
var complete=function(){this.$element.removeClass('collapsing').addClass('collapse in')[dimension]('')
this.transitioning=0
this.$element.trigger('shown.bs.collapse')}
if(!$.support.transition)return complete.call(this)
var scrollSize=$.camelCase(['scroll',dimension].join('-'))
this.$element.one('bsTransitionEnd',$.proxy(complete,this)).emulateTransitionEnd(350)[dimension](this.$element[0][scrollSize])}
Collapse.prototype.hide=function(){if(this.transitioning||!this.$element.hasClass('in'))return
var startEvent=$.Event('hide.bs.collapse')
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
var dimension=this.dimension()
this.$element[dimension](this.$element[dimension]())[0].offsetHeight
this.$element.addClass('collapsing').removeClass('collapse').removeClass('in')
this.transitioning=1
var complete=function(){this.transitioning=0
this.$element.trigger('hidden.bs.collapse').removeClass('collapsing').addClass('collapse')}
if(!$.support.transition)return complete.call(this)
this.$element
[dimension](0).one('bsTransitionEnd',$.proxy(complete,this)).emulateTransitionEnd(350)}
Collapse.prototype.toggle=function(){this[this.$element.hasClass('in')?'hide':'show']()}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.collapse')
var options=$.extend({},Collapse.DEFAULTS,$this.data(),typeof option=='object'&&option)
if(!data&&options.toggle&&option=='show')option=!option
if(!data)$this.data('bs.collapse',(data=new Collapse(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.collapse
$.fn.collapse=Plugin
$.fn.collapse.Constructor=Collapse
$.fn.collapse.noConflict=function(){$.fn.collapse=old
return this}
$(document).on('click.bs.collapse.data-api','[data-toggle="collapse"]',function(e){var href
var $this=$(this)
var target=$this.attr('data-target')||e.preventDefault()||(href=$this.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,'')
var $target=$(target)
var data=$target.data('bs.collapse')
var option=data?'toggle':$this.data()
var parent=$this.attr('data-parent')
var $parent=parent&&$(parent)
if(!data||!data.transitioning){if($parent)$parent.find('[data-toggle="collapse"][data-parent="'+parent+'"]').not($this).addClass('collapsed')
$this[$target.hasClass('in')?'addClass':'removeClass']('collapsed')}
Plugin.call($target,option)})}(jQuery);+function($){'use strict';var backdrop='.dropdown-backdrop'
var toggle='[data-toggle="dropdown"]'
var Dropdown=function(element){$(element).on('click.bs.dropdown',this.toggle)}
Dropdown.VERSION='3.2.0'
Dropdown.prototype.toggle=function(e){var $this=$(this)
if($this.is('.disabled, :disabled'))return
var $parent=getParent($this)
var isActive=$parent.hasClass('open')
clearMenus()
if(!isActive){if('ontouchstart'in document.documentElement&&!$parent.closest('.navbar-nav').length){$('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click',clearMenus)}
var relatedTarget={relatedTarget:this}
$parent.trigger(e=$.Event('show.bs.dropdown',relatedTarget))
if(e.isDefaultPrevented())return
$this.trigger('focus')
$parent.toggleClass('open').trigger('shown.bs.dropdown',relatedTarget)}
return false}
Dropdown.prototype.keydown=function(e){if(!/(38|40|27)/.test(e.keyCode))return
var $this=$(this)
e.preventDefault()
e.stopPropagation()
if($this.is('.disabled, :disabled'))return
var $parent=getParent($this)
var isActive=$parent.hasClass('open')
if(!isActive||(isActive&&e.keyCode==27)){if(e.which==27)$parent.find(toggle).trigger('focus')
return $this.trigger('click')}
var desc=' li:not(.divider):visible a'
var $items=$parent.find('[role="menu"]'+desc+', [role="listbox"]'+desc)
if(!$items.length)return
var index=$items.index($items.filter(':focus'))
if(e.keyCode==38&&index>0)index--
if(e.keyCode==40&&index<$items.length-1)index++
if(!~index)index=0
$items.eq(index).trigger('focus')}
function clearMenus(e){if(e&&e.which===3)return
$(backdrop).remove()
$(toggle).each(function(){var $parent=getParent($(this))
var relatedTarget={relatedTarget:this}
if(!$parent.hasClass('open'))return
$parent.trigger(e=$.Event('hide.bs.dropdown',relatedTarget))
if(e.isDefaultPrevented())return
$parent.removeClass('open').trigger('hidden.bs.dropdown',relatedTarget)})}
function getParent($this){var selector=$this.attr('data-target')
if(!selector){selector=$this.attr('href')
selector=selector&&/#[A-Za-z]/.test(selector)&&selector.replace(/.*(?=#[^\s]*$)/,'')}
var $parent=selector&&$(selector)
return $parent&&$parent.length?$parent:$this.parent()}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.dropdown')
if(!data)$this.data('bs.dropdown',(data=new Dropdown(this)))
if(typeof option=='string')data[option].call($this)})}
var old=$.fn.dropdown
$.fn.dropdown=Plugin
$.fn.dropdown.Constructor=Dropdown
$.fn.dropdown.noConflict=function(){$.fn.dropdown=old
return this}
$(document).on('click.bs.dropdown.data-api',clearMenus).on('click.bs.dropdown.data-api','.dropdown form',function(e){e.stopPropagation()}).on('click.bs.dropdown.data-api',toggle,Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api',toggle+', [role="menu"], [role="listbox"]',Dropdown.prototype.keydown)}(jQuery);+function($){'use strict';var Modal=function(element,options){this.options=options
this.$body=$(document.body)
this.$element=$(element)
this.$backdrop=this.isShown=null
this.scrollbarWidth=0
if(this.options.remote){this.$element.find('.modal-content').load(this.options.remote,$.proxy(function(){this.$element.trigger('loaded.bs.modal')},this))}}
Modal.VERSION='3.2.0'
Modal.DEFAULTS={backdrop:true,keyboard:true,show:true}
Modal.prototype.toggle=function(_relatedTarget){return this.isShown?this.hide():this.show(_relatedTarget)}
Modal.prototype.show=function(_relatedTarget){var that=this
var e=$.Event('show.bs.modal',{relatedTarget:_relatedTarget})
this.$element.trigger(e)
if(this.isShown||e.isDefaultPrevented())return
this.isShown=true
this.checkScrollbar()
this.$body.addClass('modal-open')
this.setScrollbar()
this.escape()
this.$element.on('click.dismiss.bs.modal','[data-dismiss="modal"]',$.proxy(this.hide,this))
this.backdrop(function(){var transition=$.support.transition&&that.$element.hasClass('fade')
if(!that.$element.parent().length){that.$element.appendTo(that.$body)}
that.$element.show().scrollTop(0)
if(transition){that.$element[0].offsetWidth}
that.$element.addClass('in').attr('aria-hidden',false)
that.enforceFocus()
var e=$.Event('shown.bs.modal',{relatedTarget:_relatedTarget})
transition?that.$element.find('.modal-dialog').one('bsTransitionEnd',function(){that.$element.trigger('focus').trigger(e)}).emulateTransitionEnd(300):that.$element.trigger('focus').trigger(e)})}
Modal.prototype.hide=function(e){if(e)e.preventDefault()
e=$.Event('hide.bs.modal')
this.$element.trigger(e)
if(!this.isShown||e.isDefaultPrevented())return
this.isShown=false
this.$body.removeClass('modal-open')
this.resetScrollbar()
this.escape()
$(document).off('focusin.bs.modal')
this.$element.removeClass('in').attr('aria-hidden',true).off('click.dismiss.bs.modal')
$.support.transition&&this.$element.hasClass('fade')?this.$element.one('bsTransitionEnd',$.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal()}
Modal.prototype.enforceFocus=function(){$(document).off('focusin.bs.modal').on('focusin.bs.modal',$.proxy(function(e){if(this.$element[0]!==e.target&&!this.$element.has(e.target).length){this.$element.trigger('focus')}},this))}
Modal.prototype.escape=function(){if(this.isShown&&this.options.keyboard){this.$element.on('keyup.dismiss.bs.modal',$.proxy(function(e){e.which==27&&this.hide()},this))}else if(!this.isShown){this.$element.off('keyup.dismiss.bs.modal')}}
Modal.prototype.hideModal=function(){var that=this
this.$element.hide()
this.backdrop(function(){that.$element.trigger('hidden.bs.modal')})}
Modal.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove()
this.$backdrop=null}
Modal.prototype.backdrop=function(callback){var that=this
var animate=this.$element.hasClass('fade')?'fade':''
if(this.isShown&&this.options.backdrop){var doAnimate=$.support.transition&&animate
this.$backdrop=$('<div class="modal-backdrop '+animate+'" />').appendTo(this.$body)
this.$element.on('click.dismiss.bs.modal',$.proxy(function(e){if(e.target!==e.currentTarget)return
this.options.backdrop=='static'?this.$element[0].focus.call(this.$element[0]):this.hide.call(this)},this))
if(doAnimate)this.$backdrop[0].offsetWidth
this.$backdrop.addClass('in')
if(!callback)return
doAnimate?this.$backdrop.one('bsTransitionEnd',callback).emulateTransitionEnd(150):callback()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass('in')
var callbackRemove=function(){that.removeBackdrop()
callback&&callback()}
$.support.transition&&this.$element.hasClass('fade')?this.$backdrop.one('bsTransitionEnd',callbackRemove).emulateTransitionEnd(150):callbackRemove()}else if(callback){callback()}}
Modal.prototype.checkScrollbar=function(){if(document.body.clientWidth>=window.innerWidth)return
this.scrollbarWidth=this.scrollbarWidth||this.measureScrollbar()}
Modal.prototype.setScrollbar=function(){var bodyPad=parseInt((this.$body.css('padding-right')||0),10)
if(this.scrollbarWidth)this.$body.css('padding-right',bodyPad+this.scrollbarWidth)}
Modal.prototype.resetScrollbar=function(){this.$body.css('padding-right','')}
Modal.prototype.measureScrollbar=function(){var scrollDiv=document.createElement('div')
scrollDiv.className='modal-scrollbar-measure'
this.$body.append(scrollDiv)
var scrollbarWidth=scrollDiv.offsetWidth-scrollDiv.clientWidth
this.$body[0].removeChild(scrollDiv)
return scrollbarWidth}
function Plugin(option,_relatedTarget){return this.each(function(){var $this=$(this)
var data=$this.data('bs.modal')
var options=$.extend({},Modal.DEFAULTS,$this.data(),typeof option=='object'&&option)
if(!data)$this.data('bs.modal',(data=new Modal(this,options)))
if(typeof option=='string')data[option](_relatedTarget)
else if(options.show)data.show(_relatedTarget)})}
var old=$.fn.modal
$.fn.modal=Plugin
$.fn.modal.Constructor=Modal
$.fn.modal.noConflict=function(){$.fn.modal=old
return this}
$(document).on('click.bs.modal.data-api','[data-toggle="modal"]',function(e){var $this=$(this)
var href=$this.attr('href')
var $target=$($this.attr('data-target')||(href&&href.replace(/.*(?=#[^\s]+$)/,'')))
var option=$target.data('bs.modal')?'toggle':$.extend({remote:!/#/.test(href)&&href},$target.data(),$this.data())
if($this.is('a'))e.preventDefault()
$target.one('show.bs.modal',function(showEvent){if(showEvent.isDefaultPrevented())return
$target.one('hidden.bs.modal',function(){$this.is(':visible')&&$this.trigger('focus')})})
Plugin.call($target,option,this)})}(jQuery);+function($){'use strict';var Tooltip=function(element,options){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null
this.init('tooltip',element,options)}
Tooltip.VERSION='3.2.0'
Tooltip.DEFAULTS={animation:true,placement:'top',selector:false,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:'hover focus',title:'',delay:0,html:false,container:false,viewport:{selector:'body',padding:0}}
Tooltip.prototype.init=function(type,element,options){this.enabled=true
this.type=type
this.$element=$(element)
this.options=this.getOptions(options)
this.$viewport=this.options.viewport&&$(this.options.viewport.selector||this.options.viewport)
var triggers=this.options.trigger.split(' ')
for(var i=triggers.length;i--;){var trigger=triggers[i]
if(trigger=='click'){this.$element.on('click.'+this.type,this.options.selector,$.proxy(this.toggle,this))}else if(trigger!='manual'){var eventIn=trigger=='hover'?'mouseenter':'focusin'
var eventOut=trigger=='hover'?'mouseleave':'focusout'
this.$element.on(eventIn+'.'+this.type,this.options.selector,$.proxy(this.enter,this))
this.$element.on(eventOut+'.'+this.type,this.options.selector,$.proxy(this.leave,this))}}
this.options.selector?(this._options=$.extend({},this.options,{trigger:'manual',selector:''})):this.fixTitle()}
Tooltip.prototype.getDefaults=function(){return Tooltip.DEFAULTS}
Tooltip.prototype.getOptions=function(options){options=$.extend({},this.getDefaults(),this.$element.data(),options)
if(options.delay&&typeof options.delay=='number'){options.delay={show:options.delay,hide:options.delay}}
return options}
Tooltip.prototype.getDelegateOptions=function(){var options={}
var defaults=this.getDefaults()
this._options&&$.each(this._options,function(key,value){if(defaults[key]!=value)options[key]=value})
return options}
Tooltip.prototype.enter=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget).data('bs.'+this.type)
if(!self){self=new this.constructor(obj.currentTarget,this.getDelegateOptions())
$(obj.currentTarget).data('bs.'+this.type,self)}
clearTimeout(self.timeout)
self.hoverState='in'
if(!self.options.delay||!self.options.delay.show)return self.show()
self.timeout=setTimeout(function(){if(self.hoverState=='in')self.show()},self.options.delay.show)}
Tooltip.prototype.leave=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget).data('bs.'+this.type)
if(!self){self=new this.constructor(obj.currentTarget,this.getDelegateOptions())
$(obj.currentTarget).data('bs.'+this.type,self)}
clearTimeout(self.timeout)
self.hoverState='out'
if(!self.options.delay||!self.options.delay.hide)return self.hide()
self.timeout=setTimeout(function(){if(self.hoverState=='out')self.hide()},self.options.delay.hide)}
Tooltip.prototype.show=function(){var e=$.Event('show.bs.'+this.type)
if(this.hasContent()&&this.enabled){this.$element.trigger(e)
var inDom=$.contains(document.documentElement,this.$element[0])
if(e.isDefaultPrevented()||!inDom)return
var that=this
var $tip=this.tip()
var tipId=this.getUID(this.type)
this.setContent()
$tip.attr('id',tipId)
this.$element.attr('aria-describedby',tipId)
if(this.options.animation)$tip.addClass('fade')
var placement=typeof this.options.placement=='function'?this.options.placement.call(this,$tip[0],this.$element[0]):this.options.placement
var autoToken=/\s?auto?\s?/i
var autoPlace=autoToken.test(placement)
if(autoPlace)placement=placement.replace(autoToken,'')||'top'
$tip.detach().css({top:0,left:0,display:'block'}).addClass(placement).data('bs.'+this.type,this)
this.options.container?$tip.appendTo(this.options.container):$tip.insertAfter(this.$element)
var pos=this.getPosition()
var actualWidth=$tip[0].offsetWidth
var actualHeight=$tip[0].offsetHeight
if(autoPlace){var orgPlacement=placement
var $parent=this.$element.parent()
var parentDim=this.getPosition($parent)
placement=placement=='bottom'&&pos.top+pos.height+actualHeight-parentDim.scroll>parentDim.height?'top':placement=='top'&&pos.top-parentDim.scroll-actualHeight<0?'bottom':placement=='right'&&pos.right+actualWidth>parentDim.width?'left':placement=='left'&&pos.left-actualWidth<parentDim.left?'right':placement
$tip.removeClass(orgPlacement).addClass(placement)}
var calculatedOffset=this.getCalculatedOffset(placement,pos,actualWidth,actualHeight)
this.applyPlacement(calculatedOffset,placement)
var complete=function(){that.$element.trigger('shown.bs.'+that.type)
that.hoverState=null}
$.support.transition&&this.$tip.hasClass('fade')?$tip.one('bsTransitionEnd',complete).emulateTransitionEnd(150):complete()}}
Tooltip.prototype.applyPlacement=function(offset,placement){var $tip=this.tip()
var width=$tip[0].offsetWidth
var height=$tip[0].offsetHeight
var marginTop=parseInt($tip.css('margin-top'),10)
var marginLeft=parseInt($tip.css('margin-left'),10)
if(isNaN(marginTop))marginTop=0
if(isNaN(marginLeft))marginLeft=0
offset.top=offset.top+marginTop
offset.left=offset.left+marginLeft
$.offset.setOffset($tip[0],$.extend({using:function(props){$tip.css({top:Math.round(props.top),left:Math.round(props.left)})}},offset),0)
$tip.addClass('in')
var actualWidth=$tip[0].offsetWidth
var actualHeight=$tip[0].offsetHeight
if(placement=='top'&&actualHeight!=height){offset.top=offset.top+height-actualHeight}
var delta=this.getViewportAdjustedDelta(placement,offset,actualWidth,actualHeight)
if(delta.left)offset.left+=delta.left
else offset.top+=delta.top
var arrowDelta=delta.left?delta.left*2-width+actualWidth:delta.top*2-height+actualHeight
var arrowPosition=delta.left?'left':'top'
var arrowOffsetPosition=delta.left?'offsetWidth':'offsetHeight'
$tip.offset(offset)
this.replaceArrow(arrowDelta,$tip[0][arrowOffsetPosition],arrowPosition)}
Tooltip.prototype.replaceArrow=function(delta,dimension,position){this.arrow().css(position,delta?(50*(1-delta/dimension)+'%'):'')}
Tooltip.prototype.setContent=function(){var $tip=this.tip()
var title=this.getTitle()
$tip.find('.tooltip-inner')[this.options.html?'html':'text'](title)
$tip.removeClass('fade in top bottom left right')}
Tooltip.prototype.hide=function(){var that=this
var $tip=this.tip()
var e=$.Event('hide.bs.'+this.type)
this.$element.removeAttr('aria-describedby')
function complete(){if(that.hoverState!='in')$tip.detach()
that.$element.trigger('hidden.bs.'+that.type)}
this.$element.trigger(e)
if(e.isDefaultPrevented())return
$tip.removeClass('in')
$.support.transition&&this.$tip.hasClass('fade')?$tip.one('bsTransitionEnd',complete).emulateTransitionEnd(150):complete()
this.hoverState=null
return this}
Tooltip.prototype.fixTitle=function(){var $e=this.$element
if($e.attr('title')||typeof($e.attr('data-original-title'))!='string'){$e.attr('data-original-title',$e.attr('title')||'').attr('title','')}}
Tooltip.prototype.hasContent=function(){return this.getTitle()}
Tooltip.prototype.getPosition=function($element){$element=$element||this.$element
var el=$element[0]
var isBody=el.tagName=='BODY'
return $.extend({},(typeof el.getBoundingClientRect=='function')?el.getBoundingClientRect():null,{scroll:isBody?document.documentElement.scrollTop||document.body.scrollTop:$element.scrollTop(),width:isBody?$(window).width():$element.outerWidth(),height:isBody?$(window).height():$element.outerHeight()},isBody?{top:0,left:0}:$element.offset())}
Tooltip.prototype.getCalculatedOffset=function(placement,pos,actualWidth,actualHeight){return placement=='bottom'?{top:pos.top+pos.height,left:pos.left+pos.width/2-actualWidth/2}:placement=='top'?{top:pos.top-actualHeight,left:pos.left+pos.width/2-actualWidth/2}:placement=='left'?{top:pos.top+pos.height/2-actualHeight/2,left:pos.left-actualWidth}:{top:pos.top+pos.height/2-actualHeight/2,left:pos.left+pos.width}}
Tooltip.prototype.getViewportAdjustedDelta=function(placement,pos,actualWidth,actualHeight){var delta={top:0,left:0}
if(!this.$viewport)return delta
var viewportPadding=this.options.viewport&&this.options.viewport.padding||0
var viewportDimensions=this.getPosition(this.$viewport)
if(/right|left/.test(placement)){var topEdgeOffset=pos.top-viewportPadding-viewportDimensions.scroll
var bottomEdgeOffset=pos.top+viewportPadding-viewportDimensions.scroll+actualHeight
if(topEdgeOffset<viewportDimensions.top){delta.top=viewportDimensions.top-topEdgeOffset}else if(bottomEdgeOffset>viewportDimensions.top+viewportDimensions.height){delta.top=viewportDimensions.top+viewportDimensions.height-bottomEdgeOffset}}else{var leftEdgeOffset=pos.left-viewportPadding
var rightEdgeOffset=pos.left+viewportPadding+actualWidth
if(leftEdgeOffset<viewportDimensions.left){delta.left=viewportDimensions.left-leftEdgeOffset}else if(rightEdgeOffset>viewportDimensions.width){delta.left=viewportDimensions.left+viewportDimensions.width-rightEdgeOffset}}
return delta}
Tooltip.prototype.getTitle=function(){var title
var $e=this.$element
var o=this.options
title=$e.attr('data-original-title')||(typeof o.title=='function'?o.title.call($e[0]):o.title)
return title}
Tooltip.prototype.getUID=function(prefix){do prefix+=~~(Math.random()*1000000)
while(document.getElementById(prefix))
return prefix}
Tooltip.prototype.tip=function(){return(this.$tip=this.$tip||$(this.options.template))}
Tooltip.prototype.arrow=function(){return(this.$arrow=this.$arrow||this.tip().find('.tooltip-arrow'))}
Tooltip.prototype.validate=function(){if(!this.$element[0].parentNode){this.hide()
this.$element=null
this.options=null}}
Tooltip.prototype.enable=function(){this.enabled=true}
Tooltip.prototype.disable=function(){this.enabled=false}
Tooltip.prototype.toggleEnabled=function(){this.enabled=!this.enabled}
Tooltip.prototype.toggle=function(e){var self=this
if(e){self=$(e.currentTarget).data('bs.'+this.type)
if(!self){self=new this.constructor(e.currentTarget,this.getDelegateOptions())
$(e.currentTarget).data('bs.'+this.type,self)}}
self.tip().hasClass('in')?self.leave(self):self.enter(self)}
Tooltip.prototype.destroy=function(){clearTimeout(this.timeout)
this.hide().$element.off('.'+this.type).removeData('bs.'+this.type)}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.tooltip')
var options=typeof option=='object'&&option
if(!data&&option=='destroy')return
if(!data)$this.data('bs.tooltip',(data=new Tooltip(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.tooltip
$.fn.tooltip=Plugin
$.fn.tooltip.Constructor=Tooltip
$.fn.tooltip.noConflict=function(){$.fn.tooltip=old
return this}}(jQuery);+function($){'use strict';var Popover=function(element,options){this.init('popover',element,options)}
if(!$.fn.tooltip)throw new Error('Popover requires tooltip.js')
Popover.VERSION='3.2.0'
Popover.DEFAULTS=$.extend({},$.fn.tooltip.Constructor.DEFAULTS,{placement:'right',trigger:'click',content:'',template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'})
Popover.prototype=$.extend({},$.fn.tooltip.Constructor.prototype)
Popover.prototype.constructor=Popover
Popover.prototype.getDefaults=function(){return Popover.DEFAULTS}
Popover.prototype.setContent=function(){var $tip=this.tip()
var title=this.getTitle()
var content=this.getContent()
$tip.find('.popover-title')[this.options.html?'html':'text'](title)
$tip.find('.popover-content').empty()[this.options.html?(typeof content=='string'?'html':'append'):'text'](content)
$tip.removeClass('fade top bottom left right in')
if(!$tip.find('.popover-title').html())$tip.find('.popover-title').hide()}
Popover.prototype.hasContent=function(){return this.getTitle()||this.getContent()}
Popover.prototype.getContent=function(){var $e=this.$element
var o=this.options
return $e.attr('data-content')||(typeof o.content=='function'?o.content.call($e[0]):o.content)}
Popover.prototype.arrow=function(){return(this.$arrow=this.$arrow||this.tip().find('.arrow'))}
Popover.prototype.tip=function(){if(!this.$tip)this.$tip=$(this.options.template)
return this.$tip}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.popover')
var options=typeof option=='object'&&option
if(!data&&option=='destroy')return
if(!data)$this.data('bs.popover',(data=new Popover(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.popover
$.fn.popover=Plugin
$.fn.popover.Constructor=Popover
$.fn.popover.noConflict=function(){$.fn.popover=old
return this}}(jQuery);+function($){'use strict';function ScrollSpy(element,options){var process=$.proxy(this.process,this)
this.$body=$('body')
this.$scrollElement=$(element).is('body')?$(window):$(element)
this.options=$.extend({},ScrollSpy.DEFAULTS,options)
this.selector=(this.options.target||'')+' .nav li > a'
this.offsets=[]
this.targets=[]
this.activeTarget=null
this.scrollHeight=0
this.$scrollElement.on('scroll.bs.scrollspy',process)
this.refresh()
this.process()}
ScrollSpy.VERSION='3.2.0'
ScrollSpy.DEFAULTS={offset:10}
ScrollSpy.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)}
ScrollSpy.prototype.refresh=function(){var offsetMethod='offset'
var offsetBase=0
if(!$.isWindow(this.$scrollElement[0])){offsetMethod='position'
offsetBase=this.$scrollElement.scrollTop()}
this.offsets=[]
this.targets=[]
this.scrollHeight=this.getScrollHeight()
var self=this
this.$body.find(this.selector).map(function(){var $el=$(this)
var href=$el.data('target')||$el.attr('href')
var $href=/^#./.test(href)&&$(href)
return($href&&$href.length&&$href.is(':visible')&&[[$href[offsetMethod]().top+offsetBase,href]])||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){self.offsets.push(this[0])
self.targets.push(this[1])})}
ScrollSpy.prototype.process=function(){var scrollTop=this.$scrollElement.scrollTop()+this.options.offset
var scrollHeight=this.getScrollHeight()
var maxScroll=this.options.offset+scrollHeight-this.$scrollElement.height()
var offsets=this.offsets
var targets=this.targets
var activeTarget=this.activeTarget
var i
if(this.scrollHeight!=scrollHeight){this.refresh()}
if(scrollTop>=maxScroll){return activeTarget!=(i=targets[targets.length-1])&&this.activate(i)}
if(activeTarget&&scrollTop<=offsets[0]){return activeTarget!=(i=targets[0])&&this.activate(i)}
for(i=offsets.length;i--;){activeTarget!=targets[i]&&scrollTop>=offsets[i]&&(!offsets[i+1]||scrollTop<=offsets[i+1])&&this.activate(targets[i])}}
ScrollSpy.prototype.activate=function(target){this.activeTarget=target
$(this.selector).parentsUntil(this.options.target,'.active').removeClass('active')
var selector=this.selector+'[data-target="'+target+'"],'+
this.selector+'[href="'+target+'"]'
var active=$(selector).parents('li').addClass('active')
if(active.parent('.dropdown-menu').length){active=active.closest('li.dropdown').addClass('active')}
active.trigger('activate.bs.scrollspy')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.scrollspy')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.scrollspy',(data=new ScrollSpy(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.scrollspy
$.fn.scrollspy=Plugin
$.fn.scrollspy.Constructor=ScrollSpy
$.fn.scrollspy.noConflict=function(){$.fn.scrollspy=old
return this}
$(window).on('load.bs.scrollspy.data-api',function(){$('[data-spy="scroll"]').each(function(){var $spy=$(this)
Plugin.call($spy,$spy.data())})})}(jQuery);+function($){'use strict';var Tab=function(element){this.element=$(element)}
Tab.VERSION='3.2.0'
Tab.prototype.show=function(){var $this=this.element
var $ul=$this.closest('ul:not(.dropdown-menu)')
var selector=$this.data('target')
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
if($this.parent('li').hasClass('active'))return
var previous=$ul.find('.active:last a')[0]
var e=$.Event('show.bs.tab',{relatedTarget:previous})
$this.trigger(e)
if(e.isDefaultPrevented())return
var $target=$(selector)
this.activate($this.closest('li'),$ul)
this.activate($target,$target.parent(),function(){$this.trigger({type:'shown.bs.tab',relatedTarget:previous})})}
Tab.prototype.activate=function(element,container,callback){var $active=container.find('> .active')
var transition=callback&&$.support.transition&&$active.hasClass('fade')
function next(){$active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active')
element.addClass('active')
if(transition){element[0].offsetWidth
element.addClass('in')}else{element.removeClass('fade')}
if(element.parent('.dropdown-menu')){element.closest('li.dropdown').addClass('active')}
callback&&callback()}
transition?$active.one('bsTransitionEnd',next).emulateTransitionEnd(150):next()
$active.removeClass('in')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.tab')
if(!data)$this.data('bs.tab',(data=new Tab(this)))
if(typeof option=='string')data[option]()})}
var old=$.fn.tab
$.fn.tab=Plugin
$.fn.tab.Constructor=Tab
$.fn.tab.noConflict=function(){$.fn.tab=old
return this}
$(document).on('click.bs.tab.data-api','[data-toggle="tab"], [data-toggle="pill"]',function(e){e.preventDefault()
Plugin.call($(this),'show')})}(jQuery);+function($){'use strict';var Affix=function(element,options){this.options=$.extend({},Affix.DEFAULTS,options)
this.$target=$(this.options.target).on('scroll.bs.affix.data-api',$.proxy(this.checkPosition,this)).on('click.bs.affix.data-api',$.proxy(this.checkPositionWithEventLoop,this))
this.$element=$(element)
this.affixed=this.unpin=this.pinnedOffset=null
this.checkPosition()}
Affix.VERSION='3.2.0'
Affix.RESET='affix affix-top affix-bottom'
Affix.DEFAULTS={offset:0,target:window}
Affix.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset
this.$element.removeClass(Affix.RESET).addClass('affix')
var scrollTop=this.$target.scrollTop()
var position=this.$element.offset()
return(this.pinnedOffset=position.top-scrollTop)}
Affix.prototype.checkPositionWithEventLoop=function(){setTimeout($.proxy(this.checkPosition,this),1)}
Affix.prototype.checkPosition=function(){if(!this.$element.is(':visible'))return
var scrollHeight=$(document).height()
var scrollTop=this.$target.scrollTop()
var position=this.$element.offset()
var offset=this.options.offset
var offsetTop=offset.top
var offsetBottom=offset.bottom
if(typeof offset!='object')offsetBottom=offsetTop=offset
if(typeof offsetTop=='function')offsetTop=offset.top(this.$element)
if(typeof offsetBottom=='function')offsetBottom=offset.bottom(this.$element)
var affix=this.unpin!=null&&(scrollTop+this.unpin<=position.top)?false:offsetBottom!=null&&(position.top+this.$element.height()>=scrollHeight-offsetBottom)?'bottom':offsetTop!=null&&(scrollTop<=offsetTop)?'top':false
if(this.affixed===affix)return
if(this.unpin!=null)this.$element.css('top','')
var affixType='affix'+(affix?'-'+affix:'')
var e=$.Event(affixType+'.bs.affix')
this.$element.trigger(e)
if(e.isDefaultPrevented())return
this.affixed=affix
this.unpin=affix=='bottom'?this.getPinnedOffset():null
this.$element.removeClass(Affix.RESET).addClass(affixType).trigger($.Event(affixType.replace('affix','affixed')))
if(affix=='bottom'){this.$element.offset({top:scrollHeight-this.$element.height()-offsetBottom})}}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.affix')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.affix',(data=new Affix(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.affix
$.fn.affix=Plugin
$.fn.affix.Constructor=Affix
$.fn.affix.noConflict=function(){$.fn.affix=old
return this}
$(window).on('load',function(){$('[data-spy="affix"]').each(function(){var $spy=$(this)
var data=$spy.data()
data.offset=data.offset||{}
if(data.offsetBottom)data.offset.bottom=data.offsetBottom
if(data.offsetTop)data.offset.top=data.offsetTop
Plugin.call($spy,data)})})}(jQuery);;!function(a,b){"use strict";var c,d,e,f="._tap",g="._tapActive",h="tap",i="clientX clientY screenX screenY pageX pageY".split(" "),j={count:0,event:0},k=function(a,c){var d=c.originalEvent,e=b.Event(d);e.type=a;for(var f=0,g=i.length;g>f;f++)e[i[f]]=c[i[f]];return e},l=function(a){if(a.isTrigger)return!1;var c=j.event,d=Math.abs(a.pageX-c.pageX),e=Math.abs(a.pageY-c.pageY),f=Math.max(d,e);return a.timeStamp-c.timeStamp<b.tap.TIME_DELTA&&f<b.tap.POSITION_DELTA&&(!c.touches||1===j.count)&&o.isTracking},m=function(a){if(!e)return!1;var c=Math.abs(a.pageX-e.pageX),d=Math.abs(a.pageY-e.pageY),f=Math.max(c,d);return Math.abs(a.timeStamp-e.timeStamp)<750&&f<b.tap.POSITION_DELTA},n=function(a){if(0===a.type.indexOf("touch")){a.touches=a.originalEvent.changedTouches;for(var b=a.touches[0],c=0,d=i.length;d>c;c++)a[i[c]]=b[i[c]]}a.timeStamp=Date.now?Date.now():+new Date},o={isEnabled:!1,isTracking:!1,enable:function(){o.isEnabled||(o.isEnabled=!0,c=b(a.body).on("touchstart"+f,o.onStart).on("mousedown"+f,o.onStart).on("click"+f,o.onClick))},disable:function(){o.isEnabled&&(o.isEnabled=!1,c.off(f))},onStart:function(a){a.isTrigger||(n(a),(!b.tap.LEFT_BUTTON_ONLY||a.touches||1===a.which)&&(a.touches&&(j.count=a.touches.length),o.isTracking||(a.touches||!m(a))&&(o.isTracking=!0,j.event=a,a.touches?(e=a,c.on("touchend"+f+g,o.onEnd).on("touchcancel"+f+g,o.onCancel)):c.on("mouseup"+f+g,o.onEnd))))},onEnd:function(a){var c;a.isTrigger||(n(a),l(a)&&(c=k(h,a),d=c,b(j.event.target).trigger(c)),o.onCancel(a))},onCancel:function(a){a&&"touchcancel"===a.type&&a.preventDefault(),o.isTracking=!1,c.off(g)},onClick:function(a){return!a.isTrigger&&d&&d.isDefaultPrevented()&&d.target===a.target&&d.pageX===a.pageX&&d.pageY===a.pageY&&a.timeStamp-d.timeStamp<750?(d=null,!1):void 0}};b(a).ready(o.enable),b.tap={POSITION_DELTA:10,TIME_DELTA:400,LEFT_BUTTON_ONLY:!0}}(document,jQuery);;jQuery(document).ready(function($){function getAndroidVersion(ua){var ua=ua||navigator.userAgent;var match=ua.match(/Android\s([0-9\.]*)/);return match?match[1]:false;};if(parseInt(getAndroidVersion())==4){$('#t3-mainnav').addClass('t3-mainnav-android');}
var JA_isLoading=false;if(/MSIE\s([\d.]+)/.test(navigator.userAgent)?new Number(RegExp.$1)<10:false){$('html').addClass('old-ie');}else if(/constructor/i.test(window.HTMLElement)){$('html').addClass('safari');}
var $wrapper=$('body'),$inner=$('.t3-wrapper'),$toggles=$('.off-canvas-toggle'),$offcanvas=$('.t3-off-canvas'),$close=$('.t3-off-canvas .close'),$btn=null,$nav=null,direction='left',$fixed=null;if(!$wrapper.length)return;$toggles.each(function(){var $this=$(this),$nav=$($this.data('nav')),effect=$this.data('effect'),direction=($('html').attr('dir')=='rtl'&&$this.data('pos')!='right')||($('html').attr('dir')!='rtl'&&$this.data('pos')=='right')?'right':'left';$nav.addClass(effect).addClass('off-canvas-'+direction);var inside_effect=['off-canvas-effect-3','off-canvas-effect-16','off-canvas-effect-7','off-canvas-effect-8','off-canvas-effect-14'];if($.inArray(effect,inside_effect)==-1){$inner.before($nav);}else{$inner.prepend($nav);}});$toggles.on('tap',function(e){stopBubble(e);if($wrapper.hasClass('off-canvas-open')){oc_hide(e);return false;}
$btn=$(this);$nav=$($btn.data('nav'));$fixed=$inner.find('*').filter(function(){return $(this).css("position")==='fixed';});$nav.addClass('off-canvas-current');direction=($('html').attr('dir')=='rtl'&&$btn.data('pos')!='right')||($('html').attr('dir')!='rtl'&&$btn.data('pos')=='right')?'right':'left';$offcanvas.height($(window).height());var events=$(window).data('events');if(events&&events.scroll&&events.scroll.length){var handlers=[];for(var i=0;i<events.scroll.length;i++){handlers[i]=events.scroll[i].handler;}
$(window).data('scroll-events',handlers);$(window).off('scroll');}
var scrollTop=($('html').scrollTop())?$('html').scrollTop():$('body').scrollTop();$('html').addClass('noscroll').css('top',-scrollTop).data('top',scrollTop);$('.t3-off-canvas').css('top',scrollTop);$fixed.each(function(){var $this=$(this),$parent=$this.parent(),mtop=0;while(!$parent.is($inner)&&$parent.css("position")==='static')$parent=$parent.parent();mtop=-$parent.offset().top;$this.css({'position':'absolute','margin-top':mtop});});$wrapper.scrollTop(scrollTop);$wrapper[0].className=$wrapper[0].className.replace(/\s*off\-canvas\-effect\-\d+\s*/g,' ').trim()+' '+$btn.data('effect')+' '+'off-canvas-'+direction;setTimeout(oc_show,50);return false;});var oc_show=function(){if(JA_isLoading==true){return;}
JA_isLoading=true;$wrapper.addClass('off-canvas-open');$inner.on('click',oc_hide);$close.on('click',oc_hide);$offcanvas.on('click',stopBubble);if($.browser.msie&&$.browser.version<10){var p1={},p2={};p1['padding-'+direction]=$('.t3-off-canvas').width();p2[direction]=0;$inner.animate(p1);$nav.animate(p2);}
setTimeout(function(){JA_isLoading=false;},200);};var oc_hide=function(){if(JA_isLoading==true){return;}
JA_isLoading=true;$inner.off('click',oc_hide);$close.off('click',oc_hide);$offcanvas.off('click',stopBubble);setTimeout(function(){$wrapper.removeClass('off-canvas-open');},100);setTimeout(function(){$wrapper.removeClass($btn.data('effect')).removeClass('off-canvas-'+direction);$wrapper.scrollTop(0);$('html').removeClass('noscroll').css('top','');$('html,body').scrollTop($('html').data('top'));$nav.removeClass('off-canvas-current');$fixed.css({'position':'','margin-top':''});if($(window).data('scroll-events')){var handlers=$(window).data('scroll-events');for(var i=0;i<handlers.length;i++){$(window).on('scroll',handlers[i]);}
$(window).data('scroll-events',null);}
JA_isLoading=false;},700);if($('html').hasClass('old-ie')){var p1={},p2={};p1['padding-'+direction]=0;p2[direction]=-$('.t3-off-canvas').width();$inner.animate(p1);$nav.animate(p2);}};var stopBubble=function(e){e.stopPropagation();return true;}});!function($){if($.browser==undefined||$.browser.msie==undefined){$.browser={msie:false,version:0};if(match=navigator.userAgent.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/)||navigator.userAgent.match(/Trident.*rv:([0-9]{1,}[\.0-9]{0,})/)){$.browser.msie=true;$.browser.version=match[1];}}
if($.browser.msie){$('html').addClass('ie'+Math.floor($.browser.version));}
$(document).ready(function(){if(!window.getComputedStyle){window.getComputedStyle=function(el,pseudo){this.el=el;this.getPropertyValue=function(prop){var re=/(\-([a-z]){1})/g;if(prop=='float')prop='styleFloat';if(re.test(prop)){prop=prop.replace(re,function(){return arguments[2].toUpperCase();});}
return el.currentStyle[prop]?el.currentStyle[prop]:null;}
return this;}}
var fromClass='body-data-holder',prop='content',$inspector=$('<div>').css('display','none').addClass(fromClass).appendTo($('body'));try{var attrs=window.getComputedStyle($inspector[0],':before').getPropertyValue(prop);if(attrs){var matches=attrs.match(/([\da-z\-]+)/gi),data={};if(matches&&matches.length){for(var i=0;i<matches.length;i++){data[matches[i++]]=i<matches.length?matches[i]:null;}}
$('body').data(data);}}finally{$inspector.remove();}});(function(){$.support.t3transform=(function(){var style=document.createElement('div').style,vendors=['t','webkitT','MozT','msT','OT'],transform,i=0,l=vendors.length;for(;i<l;i++){transform=vendors[i]+'ransform';if(transform in style){return transform;}}
return false;})();})();(function(){$('html').addClass('ontouchstart'in window?'touch':'no-touch');})();$(document).ready(function(){(function(){if(window.MooTools&&window.MooTools.More&&Element&&Element.implement){var mthide=Element.prototype.hide,mtshow=Element.prototype.show,mtslide=Element.prototype.slide;Element.implement({show:function(args){if(arguments.callee&&arguments.callee.caller&&arguments.callee.caller.toString().indexOf('isPropagationStopped')!==-1){return this;}
return $.isFunction(mtshow)&&mtshow.apply(this,args);},hide:function(){if(arguments.callee&&arguments.callee.caller&&arguments.callee.caller.toString().indexOf('isPropagationStopped')!==-1){return this;}
return $.isFunction(mthide)&&mthide.apply(this,arguments);},slide:function(args){if(arguments.callee&&arguments.callee.caller&&arguments.callee.caller.toString().indexOf('isPropagationStopped')!==-1){return this;}
return $.isFunction(mtslide)&&mtslide.apply(this,args);}})}})();$.fn.tooltip.Constructor&&$.fn.tooltip.Constructor.DEFAULTS&&($.fn.tooltip.Constructor.DEFAULTS.html=true);$.fn.popover.Constructor&&$.fn.popover.Constructor.DEFAULTS&&($.fn.popover.Constructor.DEFAULTS.html=true);$.fn.tooltip.defaults&&($.fn.tooltip.defaults.html=true);$.fn.popover.defaults&&($.fn.popover.defaults.html=true);(function(){if(window.jomsQuery&&jomsQuery.fn.collapse){$('[data-toggle="collapse"]').on('click',function(e){$($(this).attr('data-target')).eq(0).collapse('toggle');e.stopPropagation();return false;});jomsQuery('html, body').off('touchstart.dropdown.data-api');}})();(function(){if($.fn.chosen&&$(document.documentElement).attr('dir')=='rtl'){$('select').addClass('chzn-rtl');}})();});$(window).load(function(){if(!$(document.documentElement).hasClass('off-canvas-ready')&&($('.navbar-collapse-fixed-top').length||$('.navbar-collapse-fixed-bottom').length)){var btn=$('.btn-navbar[data-toggle="collapse"]');if(!btn.length){return;}
if(btn.data('target')){var nav=$(btn.data('target'));if(!nav.length){return;}
var fixedtop=nav.closest('.navbar-collapse-fixed-top').length;btn.on('click',function(){var wheight=(window.innerHeight||$(window).height());if(!$.support.transition){nav.parent().css('height',!btn.hasClass('collapsed')&&btn.data('t3-clicked')?'':wheight);btn.data('t3-clicked',1);}
nav.addClass('animate').css('max-height',wheight-
(fixedtop?(parseFloat(nav.css('top'))||0):(parseFloat(nav.css('bottom'))||0)));});nav.on('shown hidden',function(){nav.removeClass('animate');});}}});}(jQuery);;;(function($){var T3Menu=function(elm,options){this.$menu=$(elm);if(!this.$menu.length){return;}
this.options=$.extend({},$.fn.t3menu.defaults,options);this.child_open=[];this.loaded=false;this.start();};T3Menu.prototype={constructor:T3Menu,start:function(){if(this.loaded){return;}
this.loaded=true;var self=this,options=this.options,$menu=this.$menu;this.$items=$menu.find('li');this.$items.each(function(idx,li){var $item=$(this),$child=$item.children('.dropdown-menu'),$link=$item.children('a'),item={$item:$item,child:$child.length,link:$link.length,clickable:!($link.length&&$child.length),mega:$item.hasClass('mega'),status:'close',timer:null,atimer:null};$item.data('t3menu.item',item);if($child.length&&!options.hover){$item.on('click',function(e){e.stopPropagation();if($item.hasClass('group')){return;}
if(item.status=='close'){e.preventDefault();self.show(item);}});}else{$item.on('click',function(e){e.stopPropagation()});}
$item.find('a > .caret').on('click tap',function(e){item.clickable=false;});if(options.hover){$item.on('mouseover',function(e){if($item.hasClass('group'))return;var $target=$(e.target);if($target.data('show-processed'))return;$target.data('show-processed',true);setTimeout(function(){$target.data('show-processed',false);},10);self.show(item);}).on('mouseleave',function(e){if($item.hasClass('group'))return;var $target=$(e.target);if($target.data('hide-processed'))return;$target.data('hide-processed',true);setTimeout(function(){$target.data('hide-processed',false);},10);self.hide(item);});if($link.length&&$child.length){$link.on('click',function(e){return item.clickable;});}}});$(document.body).on('tap hideall.t3menu',function(e){clearTimeout(self.timer);self.timer=setTimeout($.proxy(self.hide_alls,self),e.type=='tap'?500:self.options.hidedelay);});$menu.find('.mega-dropdown-menu').on('tap hideall.t3menu',function(e){e.stopPropagation();e.preventDefault();return false;});},show:function(item){if($.inArray(item,this.child_open)<this.child_open.length-1){this.hide_others(item);}
$(document.body).trigger('hideall.t3menu',[this]);clearTimeout(this.timer);clearTimeout(item.timer);clearTimeout(item.ftimer);clearTimeout(item.ctimer);if(item.status!='open'||!item.$item.hasClass('open')||!this.child_open.length){if(item.mega){clearTimeout(item.astimer);clearTimeout(item.atimer);this.position(item.$item);item.astimer=setTimeout(function(){item.$item.addClass('animating')},10);item.atimer=setTimeout(function(){item.$item.removeClass('animating')},this.options.duration+50);item.timer=setTimeout(function(){item.$item.addClass('open')},100);}else{item.$item.addClass('open');}
item.status='open';if(item.child&&$.inArray(item,this.child_open)==-1){this.child_open.push(item);}}
item.ctimer=setTimeout($.proxy(this.clickable,this,item),300);},hide:function(item){clearTimeout(this.timer);clearTimeout(item.timer);clearTimeout(item.astimer);clearTimeout(item.atimer);clearTimeout(item.ftimer);if(item.mega){item.$item.addClass('animating');item.atimer=setTimeout(function(){item.$item.removeClass('animating')},this.options.duration);item.timer=setTimeout(function(){item.$item.removeClass('open')},100);}else{item.$item.removeClass('open');}
item.status='close';for(var i=this.child_open.length;i--;){if(this.child_open[i]===item){this.child_open.splice(i,1);}}
item.ftimer=setTimeout($.proxy(this.hidden,this,item),this.options.duration);this.timer=setTimeout($.proxy(this.hide_alls,this),this.options.hidedelay);},hidden:function(item){if(item.status=='close'){item.clickable=false;}},hide_others:function(item){var self=this;$.each(this.child_open.slice(),function(idx,open){if(!item||(open!=item&&!open.$item.has(item.$item).length)){self.hide(open);}});},hide_alls:function(e,inst){if(!e||e.type=='tap'||(e.type=='hideall'&&this!=inst)){var self=this;$.each(this.child_open.slice(),function(idx,item){item&&self.hide(item);});}},clickable:function(item){item.clickable=true;},position:function($item){var sub=$item.children('.mega-dropdown-menu'),is_show=sub.is(':visible');if(!is_show){sub.show();}
var offset=$item.offset(),width=$item.outerWidth(),screen_width=$(window).width()-this.options.sb_width,sub_width=sub.outerWidth(),level=$item.data('level');if(!is_show){sub.css('display','');}
sub.css({left:'',right:''});if(level==1){var align=$item.data('alignsub'),align_offset=0,align_delta=0,align_trans=0;if(align=='justify'){return;}
if(!align){align='left';}
if(align=='center'){align_offset=offset.left+(width/2);if(!$.support.t3transform){align_trans=-sub_width/2;sub.css(this.options.rtl?'right':'left',align_trans+width/2);}}else{align_offset=offset.left+((align=='left'&&this.options.rtl||align=='right'&&!this.options.rtl)?width:0);}
if(this.options.rtl){if(align=='right'){if(align_offset+sub_width>screen_width){align_delta=screen_width-align_offset-sub_width;sub.css('left',align_delta);if(screen_width<sub_width){sub.css('left',align_delta+sub_width-screen_width);}}}else{if(align_offset<(align=='center'?sub_width/2:sub_width)){align_delta=align_offset-(align=='center'?sub_width/2:sub_width);sub.css('right',align_delta+align_trans);}
if(align_offset+(align=='center'?sub_width/2:0)-align_delta>screen_width){sub.css('right',align_offset+(align=='center'?(sub_width+width)/2:0)+align_trans-screen_width);}}}else{if(align=='right'){if(align_offset<sub_width){align_delta=align_offset-sub_width;sub.css('right',align_delta);if(sub_width>screen_width){sub.css('right',sub_width-screen_width+align_delta);}}}else{if(align_offset+(align=='center'?sub_width/2:sub_width)>screen_width){align_delta=screen_width-align_offset-(align=='center'?sub_width/2:sub_width);sub.css('left',align_delta+align_trans);}
if(align_offset-(align=='center'?sub_width/2:0)+align_delta<0){sub.css('left',(align=='center'?(sub_width+width)/2:0)+align_trans-align_offset);}}}}else{if(this.options.rtl){if($item.closest('.mega-dropdown-menu').parent().hasClass('mega-align-right')){if(offset.left+width+sub_width>screen_width){$item.removeClass('mega-align-right');if(offset.left-sub_width<0){sub.css('right',offset.left+width-sub_width);}}}else{if(offset.left-sub_width<0){$item.removeClass('mega-align-left').addClass('mega-align-right');if(offset.left+width+sub_width>screen_width){sub.css('left',screen_width-offset.left-sub_width);}}}}else{if($item.closest('.mega-dropdown-menu').parent().hasClass('mega-align-right')){if(offset.left-sub_width<0){$item.removeClass('mega-align-right');if(offset.left+width+sub_width>screen_width){sub.css('left',screen_width-offset.left-sub_width);}}}else{if(offset.left+width+sub_width>screen_width){$item.removeClass('mega-align-left').addClass('mega-align-right');if(offset.left-sub_width<0){sub.css('right',offset.left+width-sub_width);}}}}}}};$.fn.t3menu=function(option){return this.each(function(){var $this=$(this),data=$this.data('megamenu'),options=typeof option=='object'&&option;if($this.parents('#off-canvas-nav').length)return;if($this.parents('#t3-off-canvas').length)return;if(!data){$this.data('megamenu',(data=new T3Menu(this,options)));}else{if(typeof option=='string'&&data[option]){data[option]()}}})};$.fn.t3menu.defaults={duration:400,timeout:100,hidedelay:200,hover:true,sb_width:20};$(document).ready(function(){var mm_duration=$('.t3-megamenu').data('duration')||0;if(mm_duration){$('<style type="text/css">'+'.t3-megamenu.animate .animating > .mega-dropdown-menu,'+'.t3-megamenu.animate.slide .animating > .mega-dropdown-menu > div {'+'transition-duration: '+mm_duration+'ms !important;'+'-webkit-transition-duration: '+mm_duration+'ms !important;'+'}'+'</style>').appendTo('head');}
var mm_timeout=mm_duration?100+mm_duration:500,mm_rtl=$(document.documentElement).attr('dir')=='rtl',mm_trigger=$(document.documentElement).hasClass('mm-hover'),sb_width=(function(){var parent=$('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),child=parent.children(),width=child.innerWidth()-child.height(100).innerWidth();parent.remove();return width;})();if(!$.support.transition){$('.t3-megamenu').removeClass('animate');mm_timeout=100;}
$('ul.nav').has('.dropdown-menu').t3menu({duration:mm_duration,timeout:mm_timeout,rtl:mm_rtl,sb_width:sb_width,hover:mm_trigger});$(window).load(function(){$('ul.nav').has('.dropdown-menu').t3menu({duration:mm_duration,timeout:mm_timeout,rtl:mm_rtl,sb_width:sb_width,hover:mm_trigger});});});})(jQuery);;jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,t,n,r,i){return jQuery.easing[jQuery.easing.def](e,t,n,r,i)},easeInQuad:function(e,t,n,r,i){return r*(t/=i)*t+n},easeOutQuad:function(e,t,n,r,i){return-r*(t/=i)*(t-2)+n},easeInOutQuad:function(e,t,n,r,i){return(t/=i/2)<1?r/2*t*t+n:-r/2*(--t*(t-2)-1)+n},easeInCubic:function(e,t,n,r,i){return r*(t/=i)*t*t+n},easeOutCubic:function(e,t,n,r,i){return r*((t=t/i-1)*t*t+1)+n},easeInOutCubic:function(e,t,n,r,i){return(t/=i/2)<1?r/2*t*t*t+n:r/2*((t-=2)*t*t+2)+n},easeInQuart:function(e,t,n,r,i){return r*(t/=i)*t*t*t+n},easeOutQuart:function(e,t,n,r,i){return-r*((t=t/i-1)*t*t*t-1)+n},easeInOutQuart:function(e,t,n,r,i){return(t/=i/2)<1?r/2*t*t*t*t+n:-r/2*((t-=2)*t*t*t-2)+n},easeInQuint:function(e,t,n,r,i){return r*(t/=i)*t*t*t*t+n},easeOutQuint:function(e,t,n,r,i){return r*((t=t/i-1)*t*t*t*t+1)+n},easeInOutQuint:function(e,t,n,r,i){return(t/=i/2)<1?r/2*t*t*t*t*t+n:r/2*((t-=2)*t*t*t*t+2)+n},easeInSine:function(e,t,n,r,i){return-r*Math.cos(t/i*(Math.PI/2))+r+n},easeOutSine:function(e,t,n,r,i){return r*Math.sin(t/i*(Math.PI/2))+n},easeInOutSine:function(e,t,n,r,i){return-r/2*(Math.cos(Math.PI*t/i)-1)+n},easeInExpo:function(e,t,n,r,i){return t==0?n:r*Math.pow(2,10*(t/i-1))+n},easeOutExpo:function(e,t,n,r,i){return t==i?n+r:r*(-Math.pow(2,-10*t/i)+1)+n},easeInOutExpo:function(e,t,n,r,i){return t==0?n:t==i?n+r:(t/=i/2)<1?r/2*Math.pow(2,10*(t-1))+n:r/2*(-Math.pow(2,-10*--t)+2)+n},easeInCirc:function(e,t,n,r,i){return-r*(Math.sqrt(1-(t/=i)*t)-1)+n},easeOutCirc:function(e,t,n,r,i){return r*Math.sqrt(1-(t=t/i-1)*t)+n},easeInOutCirc:function(e,t,n,r,i){return(t/=i/2)<1?-r/2*(Math.sqrt(1-t*t)-1)+n:r/2*(Math.sqrt(1-(t-=2)*t)+1)+n},easeInElastic:function(e,t,n,r,i){var s=1.70158,o=0,u=r;if(t==0)return n;if((t/=i)==1)return n+r;o||(o=i*.3);if(u<Math.abs(r)){u=r;var s=o/4}else var s=o/(2*Math.PI)*Math.asin(r/u);return-(u*Math.pow(2,10*(t-=1))*Math.sin((t*i-s)*2*Math.PI/o))+n},easeOutElastic:function(e,t,n,r,i){var s=1.70158,o=0,u=r;if(t==0)return n;if((t/=i)==1)return n+r;o||(o=i*.3);if(u<Math.abs(r)){u=r;var s=o/4}else var s=o/(2*Math.PI)*Math.asin(r/u);return u*Math.pow(2,-10*t)*Math.sin((t*i-s)*2*Math.PI/o)+r+n},easeInOutElastic:function(e,t,n,r,i){var s=1.70158,o=0,u=r;if(t==0)return n;if((t/=i/2)==2)return n+r;o||(o=i*.3*1.5);if(u<Math.abs(r)){u=r;var s=o/4}else var s=o/(2*Math.PI)*Math.asin(r/u);return t<1?-0.5*u*Math.pow(2,10*(t-=1))*Math.sin((t*i-s)*2*Math.PI/o)+n:u*Math.pow(2,-10*(t-=1))*Math.sin((t*i-s)*2*Math.PI/o)*.5+r+n},easeInBack:function(e,t,n,r,i,s){s==undefined&&(s=1.70158);return r*(t/=i)*t*((s+1)*t-s)+n},easeOutBack:function(e,t,n,r,i,s){s==undefined&&(s=1.70158);return r*((t=t/i-1)*t*((s+1)*t+s)+1)+n},easeInOutBack:function(e,t,n,r,i,s){s==undefined&&(s=1.70158);return(t/=i/2)<1?r/2*t*t*(((s*=1.525)+1)*t-s)+n:r/2*((t-=2)*t*(((s*=1.525)+1)*t+s)+2)+n},easeInBounce:function(e,t,n,r,i){return r-jQuery.easing.easeOutBounce(e,i-t,0,r,i)+n},easeOutBounce:function(e,t,n,r,i){return(t/=i)<1/2.75?r*7.5625*t*t+n:t<2/2.75?r*(7.5625*(t-=1.5/2.75)*t+.75)+n:t<2.5/2.75?r*(7.5625*(t-=2.25/2.75)*t+.9375)+n:r*(7.5625*(t-=2.625/2.75)*t+.984375)+n},easeInOutBounce:function(e,t,n,r,i){return t<i/2?jQuery.easing.easeInBounce(e,t*2,0,r,i)*.5+n:jQuery.easing.easeOutBounce(e,t*2-i,0,r,i)*.5+r*.5+n}});;(function(window,$,undefined){"use strict";$.infinitescroll=function infscr(options,callback,element){this.element=$(element);if(!this._create(options,callback)){this.failed=true;}};$.infinitescroll.defaults={loading:{finished:undefined,finishedMsg:"<em>Congratulations, you've reached the end of the internet.</em>",img:"data:image/gif;base64,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",msg:null,msgText:"<em>Loading the next set of posts...</em>",selector:null,speed:'fast',start:undefined},state:{isDuringAjax:false,isInvalidPage:false,isDestroyed:false,isDone:false,isPaused:false,isBeyondMaxPage:false,currPage:1},debug:false,behavior:undefined,binder:$(window),nextSelector:"div.navigation a:first",navSelector:"div.navigation",contentSelector:null,extraScrollPx:150,itemSelector:"div.post",animate:false,pathParse:undefined,dataType:'html',appendCallback:true,bufferPx:40,errorCallback:function(){},infid:0,pixelsFromNavToBottom:undefined,path:undefined,prefill:false,maxPage:undefined};$.infinitescroll.prototype={_binding:function infscr_binding(binding){var instance=this,opts=instance.options;opts.v='2.0b2.120520';if(!!opts.behavior&&this['_binding_'+opts.behavior]!==undefined){this['_binding_'+opts.behavior].call(this);return;}
if(binding!=='bind'&&binding!=='unbind'){this._debug('Binding value  '+ binding+' not valid');return false;}
if(binding==='unbind'){(this.options.binder).unbind('smartscroll.infscr.'+ instance.options.infid);}else{(this.options.binder)[binding]('smartscroll.infscr.'+ instance.options.infid,function(){instance.scroll();});}
this._debug('Binding',binding);},_create:function infscr_create(options,callback){var opts=$.extend(true,{},$.infinitescroll.defaults,options);this.options=opts;var $window=$(window);var instance=this;if(!instance._validate(options)){return false;}
var path=$(opts.nextSelector).attr('href');if(!path){this._debug('Navigation selector not found');return false;}
opts.path=opts.path||this._determinepath(path);opts.contentSelector=opts.contentSelector||this.element;opts.loading.selector=opts.loading.selector||opts.contentSelector;opts.loading.msg=opts.loading.msg||$('<div id="infscr-loading">'+ opts.loading.img+'<div>'+ opts.loading.msgText+'</div></div>');(new Image()).src=opts.loading.img;if(opts.pixelsFromNavToBottom===undefined){opts.pixelsFromNavToBottom=$(document).height()- $(opts.navSelector).offset().top;this._debug("pixelsFromNavToBottom: "+ opts.pixelsFromNavToBottom);}
var self=this;opts.loading.start=opts.loading.start||function(){$(opts.navSelector).hide();opts.loading.msg.appendTo(opts.loading.selector).show(opts.loading.speed,$.proxy(function(){this.beginAjax(opts);},self));};opts.loading.finished=opts.loading.finished||function(){if(!opts.state.isBeyondMaxPage)
opts.loading.msg.fadeOut(opts.loading.speed);};opts.callback=function(instance,data,url){if(!!opts.behavior&&instance['_callback_'+opts.behavior]!==undefined){instance['_callback_'+opts.behavior].call($(opts.contentSelector)[0],data,url);}
if(callback){callback.call($(opts.contentSelector)[0],data,opts,url);}
if(opts.prefill){$window.bind("resize.infinite-scroll",instance._prefill);}};if(options.debug){if(Function.prototype.bind&&(typeof console==='object'||typeof console==='function')&&typeof console.log==="object"){["log","info","warn","error","assert","dir","clear","profile","profileEnd"].forEach(function(method){console[method]=this.call(console[method],console);},Function.prototype.bind);}}
this._setup();if(opts.prefill){this._prefill();}
return true;},_prefill:function infscr_prefill(){var instance=this;var $window=$(window);function needsPrefill(){return(instance.options.contentSelector.height()<=$window.height());}
this._prefill=function(){if(needsPrefill()){instance.scroll();}
$window.bind("resize.infinite-scroll",function(){if(needsPrefill()){$window.unbind("resize.infinite-scroll");instance.scroll();}});};this._prefill();},_debug:function infscr_debug(){if(true!==this.options.debug){return;}
if(typeof console!=='undefined'&&typeof console.log==='function'){if((Array.prototype.slice.call(arguments)).length===1&&typeof Array.prototype.slice.call(arguments)[0]==='string'){console.log((Array.prototype.slice.call(arguments)).toString());}else{console.log(Array.prototype.slice.call(arguments));}}else if(!Function.prototype.bind&&typeof console!=='undefined'&&typeof console.log==='object'){Function.prototype.call.call(console.log,console,Array.prototype.slice.call(arguments));}},_determinepath:function infscr_determinepath(path){var opts=this.options;if(!!opts.behavior&&this['_determinepath_'+opts.behavior]!==undefined){return this['_determinepath_'+opts.behavior].call(this,path);}
if(!!opts.pathParse){this._debug('pathParse manual');return opts.pathParse(path,this.options.state.currPage+1);}else if(path.match(/^(.*?)\b2\b(.*?$)/)){path=path.match(/^(.*?)\b2\b(.*?$)/).slice(1);}else if(path.match(/^(.*?)2(.*?$)/)){if(path.match(/^(.*?page=)2(\/.*|$)/)){path=path.match(/^(.*?page=)2(\/.*|$)/).slice(1);return path;}
path=path.match(/^(.*?)2(.*?$)/).slice(1);}else{if(path.match(/^(.*?page=)1(\/.*|$)/)){path=path.match(/^(.*?page=)1(\/.*|$)/).slice(1);return path;}else{this._debug('Sorry, we couldn\'t parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com.');opts.state.isInvalidPage=true;}}
this._debug('determinePath',path);return path;},_error:function infscr_error(xhr){var opts=this.options;if(!!opts.behavior&&this['_error_'+opts.behavior]!==undefined){this['_error_'+opts.behavior].call(this,xhr);return;}
if(xhr!=='destroy'&&xhr!=='end'){xhr='unknown';}
this._debug('Error',xhr);if(xhr==='end'||opts.state.isBeyondMaxPage){this._showdonemsg();}
opts.state.isDone=true;opts.state.currPage=1;opts.state.isPaused=false;opts.state.isBeyondMaxPage=false;this._binding('unbind');},_loadcallback:function infscr_loadcallback(box,data,url){var opts=this.options,callback=this.options.callback,result=(opts.state.isDone)?'done':(!opts.appendCallback)?'no-append':'append',frag;if(!!opts.behavior&&this['_loadcallback_'+opts.behavior]!==undefined){this['_loadcallback_'+opts.behavior].call(this,box,data);return;}
switch(result){case'done':this._showdonemsg();return false;case'no-append':if(opts.dataType==='html'){data='<div>'+ data+'</div>';data=$(data).find(opts.itemSelector);}
break;case'append':var children=box.children();if(children.length===0){return this._error('end');}
frag=document.createDocumentFragment();while(box[0].firstChild){frag.appendChild(box[0].firstChild);}
this._debug('contentSelector',$(opts.contentSelector)[0]);$(opts.contentSelector)[0].appendChild(frag);data=children.get();break;}
opts.loading.finished.call($(opts.contentSelector)[0],opts);if(opts.animate){var scrollTo=$(window).scrollTop()+ $(opts.loading.msg).height()+ opts.extraScrollPx+'px';$('html,body').animate({scrollTop:scrollTo},800,function(){opts.state.isDuringAjax=false;});}
if(!opts.animate){opts.state.isDuringAjax=false;}
callback(this,data,url);if(opts.prefill){this._prefill();}},_nearbottom:function infscr_nearbottom(){var opts=this.options,pixelsFromWindowBottomToBottom=0+ $(document).height()-(opts.binder.scrollTop())- $(window).height();if(!!opts.behavior&&this['_nearbottom_'+opts.behavior]!==undefined){return this['_nearbottom_'+opts.behavior].call(this);}
this._debug('math:',pixelsFromWindowBottomToBottom,opts.pixelsFromNavToBottom);return(pixelsFromWindowBottomToBottom- opts.bufferPx<opts.pixelsFromNavToBottom);},_pausing:function infscr_pausing(pause){var opts=this.options;if(!!opts.behavior&&this['_pausing_'+opts.behavior]!==undefined){this['_pausing_'+opts.behavior].call(this,pause);return;}
if(pause!=='pause'&&pause!=='resume'&&pause!==null){this._debug('Invalid argument. Toggling pause value instead');}
pause=(pause&&(pause==='pause'||pause==='resume'))?pause:'toggle';switch(pause){case'pause':opts.state.isPaused=true;break;case'resume':opts.state.isPaused=false;break;case'toggle':opts.state.isPaused=!opts.state.isPaused;break;}
this._debug('Paused',opts.state.isPaused);return false;},_setup:function infscr_setup(){var opts=this.options;if(!!opts.behavior&&this['_setup_'+opts.behavior]!==undefined){this['_setup_'+opts.behavior].call(this);return;}
this._binding('bind');return false;},_showdonemsg:function infscr_showdonemsg(){var opts=this.options;if(!!opts.behavior&&this['_showdonemsg_'+opts.behavior]!==undefined){this['_showdonemsg_'+opts.behavior].call(this);return;}
opts.loading.msg.find('img').hide().parent().find('div').html(opts.loading.finishedMsg).animate({opacity:1},2000,function(){$(this).parent().fadeOut(opts.loading.speed);});opts.errorCallback.call($(opts.contentSelector)[0],'done');},_validate:function infscr_validate(opts){for(var key in opts){if(key.indexOf&&key.indexOf('Selector')>-1&&$(opts[key]).length===0){this._debug('Your '+ key+' found no elements.');return false;}}
return true;},bind:function infscr_bind(){this._binding('bind');},destroy:function infscr_destroy(){this.options.state.isDestroyed=true;this.options.loading.finished();return this._error('destroy');},pause:function infscr_pause(){this._pausing('pause');},resume:function infscr_resume(){this._pausing('resume');},beginAjax:function infscr_ajax(opts){var instance=this,path=opts.path,box,desturl,method,condition;opts.state.currPage++;if(opts.maxPage!=undefined&&opts.state.currPage>opts.maxPage){opts.state.isBeyondMaxPage=true;this.destroy();return;}
box=$(opts.contentSelector).is('table, tbody')?$('<tbody/>'):$('<div/>');desturl=(typeof path==='function')?path(opts.state.currPage):path.join(opts.state.currPage);instance._debug('heading into ajax',desturl);method=(opts.dataType==='html'||opts.dataType==='json')?opts.dataType:'html+callback';if(opts.appendCallback&&opts.dataType==='html'){method+='+callback';}
switch(method){case'html+callback':instance._debug('Using HTML via .load() method');box.load(desturl+' '+ opts.itemSelector,undefined,function infscr_ajax_callback(responseText){instance._loadcallback(box,responseText,desturl);});break;case'html':instance._debug('Using '+(method.toUpperCase())+' via $.ajax() method');$.ajax({url:desturl,dataType:opts.dataType,complete:function infscr_ajax_callback(jqXHR,textStatus){condition=(typeof(jqXHR.isResolved)!=='undefined')?(jqXHR.isResolved()):(textStatus==="success"||textStatus==="notmodified");if(condition){instance._loadcallback(box,jqXHR.responseText,desturl);}else{instance._error('end');}}});break;case'json':instance._debug('Using '+(method.toUpperCase())+' via $.ajax() method');$.ajax({dataType:'json',type:'GET',url:desturl,success:function(data,textStatus,jqXHR){condition=(typeof(jqXHR.isResolved)!=='undefined')?(jqXHR.isResolved()):(textStatus==="success"||textStatus==="notmodified");if(opts.appendCallback){if(opts.template!==undefined){var theData=opts.template(data);box.append(theData);if(condition){instance._loadcallback(box,theData);}else{instance._error('end');}}else{instance._debug("template must be defined.");instance._error('end');}}else{if(condition){instance._loadcallback(box,data,desturl);}else{instance._error('end');}}},error:function(){instance._debug("JSON ajax request failed.");instance._error('end');}});break;}},retrieve:function infscr_retrieve(pageNum){pageNum=pageNum||null;var instance=this,opts=instance.options;if(!!opts.behavior&&this['retrieve_'+opts.behavior]!==undefined){this['retrieve_'+opts.behavior].call(this,pageNum);return;}
if(opts.state.isDestroyed){this._debug('Instance is destroyed');return false;}
opts.state.isDuringAjax=true;opts.loading.start.call($(opts.contentSelector)[0],opts);},scroll:function infscr_scroll(){var opts=this.options,state=opts.state;if(!!opts.behavior&&this['scroll_'+opts.behavior]!==undefined){this['scroll_'+opts.behavior].call(this);return;}
if(state.isDuringAjax||state.isInvalidPage||state.isDone||state.isDestroyed||state.isPaused){return;}
if(!this._nearbottom()){return;}
this.retrieve();},toggle:function infscr_toggle(){this._pausing();},unbind:function infscr_unbind(){this._binding('unbind');},update:function infscr_options(key){if($.isPlainObject(key)){this.options=$.extend(true,this.options,key);}}};$.fn.infinitescroll=function infscr_init(options,callback){var thisCall=typeof options;switch(thisCall){case'string':var args=Array.prototype.slice.call(arguments,1);this.each(function(){var instance=$.data(this,'infinitescroll');if(!instance){return false;}
if(!$.isFunction(instance[options])||options.charAt(0)==="_"){return false;}
instance[options].apply(instance,args);});break;case'object':this.each(function(){var instance=$.data(this,'infinitescroll');if(instance){instance.update(options);}else{instance=new $.infinitescroll(options,callback,this);if(!instance.failed){$.data(this,'infinitescroll',instance);}}});break;}
return this;};var event=$.event,scrollTimeout;event.special.smartscroll={setup:function(){$(this).bind("scroll",event.special.smartscroll.handler);},teardown:function(){$(this).unbind("scroll",event.special.smartscroll.handler);},handler:function(event,execAsap){var context=this,args=arguments;event.type="smartscroll";if(scrollTimeout){clearTimeout(scrollTimeout);}
scrollTimeout=setTimeout(function(){$(context).trigger('smartscroll',args);},execAsap==="execAsap"?0:100);}};$.fn.smartscroll=function(fn){return fn?this.bind("smartscroll",fn):this.trigger("smartscroll",["execAsap"]);};})(window,jQuery);;;(function(plugin){if(typeof define==='function'&&define.amd){define(['jquery'],plugin);}else{plugin(jQuery);}}(function($){var $scrollTo=$.scrollTo=function(target,duration,settings){return $(window).scrollTo(target,duration,settings);};$scrollTo.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};$scrollTo.window=function(scope){return $(window)._scrollable();};$.fn._scrollable=function(){return this.map(function(){var elem=this,isWin=!elem.nodeName||$.inArray(elem.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)
return elem;var doc=(elem.contentWindow||elem).document||elem.ownerDocument||elem;return/webkit/i.test(navigator.userAgent)||doc.compatMode=='BackCompat'?doc.body:doc.documentElement;});};$.fn.scrollTo=function(target,duration,settings){if(typeof duration=='object'){settings=duration;duration=0;}
if(typeof settings=='function')
settings={onAfter:settings};if(target=='max')
target=9e9;settings=$.extend({},$scrollTo.defaults,settings);duration=duration||settings.duration;settings.queue=settings.queue&&settings.axis.length>1;if(settings.queue)
duration/=2;settings.offset=both(settings.offset);settings.over=both(settings.over);return this._scrollable().each(function(){if(target==null)return;var elem=this,$elem=$(elem),targ=target,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break;}
targ=win?$(targ):$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)
toff=(targ=$(targ)).offset();}
var offset=$.isFunction(settings.offset)&&settings.offset(elem,targ)||settings.offset;$.each(settings.axis.split(''),function(i,axis){var Pos=axis=='x'?'Left':'Top',pos=Pos.toLowerCase(),key='scroll'+Pos,old=elem[key],max=$scrollTo.max(elem,axis);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(settings.margin){attr[key]-=parseInt(targ.css('margin'+Pos))||0;attr[key]-=parseInt(targ.css('border'+Pos+'Width'))||0;}
attr[key]+=offset[pos]||0;if(settings.over[pos])
attr[key]+=targ[axis=='x'?'width':'height']()*settings.over[pos];}else{var val=targ[pos];attr[key]=val.slice&&val.slice(-1)=='%'?parseFloat(val)/100*max:val;}
if(settings.limit&&/^\d+$/.test(attr[key]))
attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&settings.queue){if(old!=attr[key])
animate(settings.onAfterFirst);delete attr[key];}});animate(settings.onAfter);function animate(callback){$elem.animate(attr,duration,settings.easing,callback&&function(){callback.call(this,targ,settings);});};}).end();};$scrollTo.max=function(elem,axis){var Dim=axis=='x'?'Width':'Height',scroll='scroll'+Dim;if(!$(elem).is('html,body'))
return elem[scroll]-$(elem)[Dim.toLowerCase()]();var size='client'+Dim,html=elem.ownerDocument.documentElement,body=elem.ownerDocument.body;return Math.max(html[scroll],body[scroll])
-Math.min(html[size],body[size]);};function both(val){return $.isFunction(val)||typeof val=='object'?val:{top:val,left:val};};return $scrollTo;}));;(function(window,document){'use strict';var features={bind:!!(function(){}.bind),classList:'classList'in document.documentElement,rAF:!!(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame)};window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame;function Debouncer(callback){this.callback=callback;this.ticking=false;}
Debouncer.prototype={constructor:Debouncer,update:function(){this.callback&&this.callback();this.ticking=false;},requestTick:function(){if(!this.ticking){requestAnimationFrame(this.rafCallback||(this.rafCallback=this.update.bind(this)));this.ticking=true;}},handleEvent:function(){this.requestTick();}};function extend(object){if(arguments.length<=0){throw new Error('Missing arguments in extend function');}
var result=object||{},key,i;for(i=1;i<arguments.length;i++){var replacement=arguments[i]||{};for(key in replacement){if(typeof result[key]==='object'){result[key]=extend(result[key],replacement[key]);}
else{result[key]=result[key]||replacement[key];}}}
return result;}
function Headroom(elem,options){options=extend(options,Headroom.options);this.lastKnownScrollY=0;this.elem=elem;this.debouncer=new Debouncer(this.update.bind(this));this.tolerance=options.tolerance;this.classes=options.classes;this.offset=options.offset;this.initialised=false;this.onPin=options.onPin;this.onUnpin=options.onUnpin;}
Headroom.prototype={constructor:Headroom,init:function(){if(!Headroom.cutsTheMustard){return;}
this.elem.classList.add(this.classes.initial);setTimeout(this.attachEvent.bind(this),100);return this;},destroy:function(){var classes=this.classes;this.initialised=false;window.removeEventListener('scroll',this.debouncer,false);this.elem.classList.remove(classes.unpinned,classes.pinned,classes.initial);},attachEvent:function(){if(!this.initialised){this.lastKnownScrollY=this.getScrollY();this.initialised=true;window.addEventListener('scroll',this.debouncer,false);}},unpin:function(){var classList=this.elem.classList,classes=this.classes;if(classList.contains(classes.pinned)||!classList.contains(classes.unpinned)){classList.add(classes.unpinned);classList.remove(classes.pinned);this.onUnpin&&this.onUnpin.call(this);}},pin:function(){var classList=this.elem.classList,classes=this.classes;if(classList.contains(classes.unpinned)){classList.remove(classes.unpinned);classList.add(classes.pinned);this.onPin&&this.onPin.call(this);}},getScrollY:function(){return(window.pageYOffset!==undefined)?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop;},getViewportHeight:function(){return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;},getDocumentHeight:function(){var body=document.body,documentElement=document.documentElement;return Math.max(body.scrollHeight,documentElement.scrollHeight,body.offsetHeight,documentElement.offsetHeight,body.clientHeight,documentElement.clientHeight);},isOutOfBounds:function(currentScrollY){var pastTop=currentScrollY<0,pastBottom=currentScrollY+this.getViewportHeight()>this.getDocumentHeight();return pastTop||pastBottom;},toleranceExceeded:function(currentScrollY){return Math.abs(currentScrollY-this.lastKnownScrollY)>=this.tolerance;},shouldUnpin:function(currentScrollY,toleranceExceeded){var scrollingDown=currentScrollY>this.lastKnownScrollY,pastOffset=currentScrollY>=this.offset;return scrollingDown&&pastOffset&&toleranceExceeded;},shouldPin:function(currentScrollY,toleranceExceeded){var scrollingUp=currentScrollY<this.lastKnownScrollY,pastOffset=currentScrollY<=this.offset;return(scrollingUp&&toleranceExceeded)||pastOffset;},update:function(){var currentScrollY=this.getScrollY(),toleranceExceeded=this.toleranceExceeded(currentScrollY);if(this.isOutOfBounds(currentScrollY)){return;}
if(this.shouldUnpin(currentScrollY,toleranceExceeded)){this.unpin();}
else if(this.shouldPin(currentScrollY,toleranceExceeded)){this.pin();}
this.lastKnownScrollY=currentScrollY;}};Headroom.options={tolerance:0,offset:0,classes:{pinned:'headroom--pinned',unpinned:'headroom--unpinned',initial:'headroom'}};Headroom.cutsTheMustard=typeof features!=='undefined'&&features.rAF&&features.bind&&features.classList;window.Headroom=Headroom;}(window,document));;var ssc_framerate=350;var ssc_animtime=1000;var ssc_stepsize=130;var ssc_pulseAlgorithm=true;var ssc_pulseScale=6;var ssc_pulseNormalize=1;var ssc_keyboardsupport=true;var ssc_arrowscroll=50;var ssc_frame=false;var ssc_direction={x:0,y:0};var ssc_initdone=false;var ssc_fixedback=true;var ssc_root=document.documentElement;var ssc_activeElement;var ssc_key={left:37,up:38,right:39,down:40,spacebar:32,pageup:33,pagedown:34,end:35,home:36};function ssc_init(){if(!document.body)return;var body=document.body;var html=document.documentElement;var windowHeight=window.innerHeight;var scrollHeight=body.scrollHeight;ssc_root=(document.compatMode.indexOf('CSS')>=0)?html:body;ssc_activeElement=body;ssc_initdone=true;if(top!=self){ssc_frame=true;}
else if(scrollHeight>windowHeight&&(body.offsetHeight<=windowHeight||html.offsetHeight<=windowHeight)){ssc_root.style.height="auto";if(ssc_root.offsetHeight<=windowHeight){var underlay=document.createElement("div");underlay.style.clear="both";body.appendChild(underlay);}}
if(!ssc_fixedback){body.style.backgroundAttachment="scroll";html.style.backgroundAttachment="scroll";}
if(ssc_keyboardsupport){ssc_addEvent("keydown",ssc_keydown);}}
var ssc_que=[];var ssc_pending=false;function ssc_scrollArray(elem,left,top,delay){delay||(delay=1000);ssc_directionCheck(left,top);ssc_que.push({x:left,y:top,lastX:(left<0)?0.99:-0.99,lastY:(top<0)?0.99:-0.99,start:+new Date});if(ssc_pending){return;}
var step=function(){var now=+new Date;var scrollX=0;var scrollY=0;for(var i=0;i<ssc_que.length;i++){var item=ssc_que[i];var elapsed=now-item.start;var finished=(elapsed>=ssc_animtime);var position=(finished)?1:elapsed/ssc_animtime;if(ssc_pulseAlgorithm){position=ssc_pulse(position);}
var x=(item.x*position-item.lastX)>>0;var y=(item.y*position-item.lastY)>>0;scrollX+=x;scrollY+=y;item.lastX+=x;item.lastY+=y;if(finished){ssc_que.splice(i,1);i--;}}
if(left){var lastLeft=elem.scrollLeft;elem.scrollLeft+=scrollX;if(scrollX&&elem.scrollLeft===lastLeft){left=0;}}
if(top){var lastTop=elem.scrollTop;elem.scrollTop+=scrollY;if(scrollY&&elem.scrollTop===lastTop){top=0;}}
if(!left&&!top){ssc_que=[];}
if(ssc_que.length){setTimeout(step,delay/ssc_framerate+1);}else{ssc_pending=false;}}
setTimeout(step,0);ssc_pending=true;}
function ssc_wheel(event){if(!ssc_initdone){}
var target=event.target;var overflowing=ssc_overflowingAncestor(target);if(!overflowing||event.defaultPrevented||ssc_isNodeName(ssc_activeElement,"embed")||(ssc_isNodeName(target,"embed")&&/\.pdf/i.test(target.src))){return true;}
var deltaX=event.wheelDeltaX||0;var deltaY=event.wheelDeltaY||0;if(!deltaX&&!deltaY){deltaY=event.wheelDelta||0;}
if(Math.abs(deltaX)>1.2){deltaX*=ssc_stepsize/120;}
if(Math.abs(deltaY)>1.2){deltaY*=ssc_stepsize/120;}
ssc_scrollArray(overflowing,-deltaX,-deltaY);event.preventDefault();}
function ssc_keydown(event){var target=event.target;var modifier=event.ctrlKey||event.altKey||event.metaKey;if(/input|textarea|embed/i.test(target.nodeName)||target.isContentEditable||event.defaultPrevented||modifier){return true;}
if(ssc_isNodeName(target,"button")&&event.keyCode===ssc_key.spacebar){return true;}
var shift,x=0,y=0;var elem=ssc_overflowingAncestor(ssc_activeElement);var clientHeight=elem.clientHeight;if(elem==document.body){clientHeight=window.innerHeight;}
switch(event.keyCode){case ssc_key.up:y=-ssc_arrowscroll;break;case ssc_key.down:y=ssc_arrowscroll;break;case ssc_key.spacebar:shift=event.shiftKey?1:-1;y=-shift*clientHeight*0.9;break;case ssc_key.pageup:y=-clientHeight*0.9;break;case ssc_key.pagedown:y=clientHeight*0.9;break;case ssc_key.home:y=-elem.scrollTop;break;case ssc_key.end:var damt=elem.scrollHeight-elem.scrollTop-clientHeight;y=(damt>0)?damt+10:0;break;case ssc_key.left:x=-ssc_arrowscroll;break;case ssc_key.right:x=ssc_arrowscroll;break;default:return true;}
ssc_scrollArray(elem,x,y);event.preventDefault();}
function ssc_mousedown(event){ssc_activeElement=event.target;}
var ssc_cache={};setInterval(function(){ssc_cache={};},10*1000);var ssc_uniqueID=(function(){var i=0;return function(el){return el.ssc_uniqueID||(el.ssc_uniqueID=i++);};})();function ssc_setCache(elems,overflowing){for(var i=elems.length;i--;)
ssc_cache[ssc_uniqueID(elems[i])]=overflowing;return overflowing;}
function ssc_overflowingAncestor(el){var elems=[];var ssc_rootScrollHeight=ssc_root.scrollHeight;do{var cached=ssc_cache[ssc_uniqueID(el)];if(cached){return ssc_setCache(elems,cached);}
elems.push(el);if(ssc_rootScrollHeight===el.scrollHeight){if(!ssc_frame||ssc_root.clientHeight+10<ssc_rootScrollHeight){return ssc_setCache(elems,document.body);}}else if(el.clientHeight+10<el.scrollHeight){overflow=getComputedStyle(el,"").getPropertyValue("overflow");if(overflow==="scroll"||overflow==="auto"){return ssc_setCache(elems,el);}}}while(el=el.parentNode);}
function ssc_addEvent(type,fn,bubble){window.addEventListener(type,fn,(bubble||false));}
function ssc_removeEvent(type,fn,bubble){window.removeEventListener(type,fn,(bubble||false));}
function ssc_isNodeName(el,tag){return el.nodeName.toLowerCase()===tag.toLowerCase();}
function ssc_directionCheck(x,y){x=(x>0)?1:-1;y=(y>0)?1:-1;if(ssc_direction.x!==x||ssc_direction.y!==y){ssc_direction.x=x;ssc_direction.y=y;ssc_que=[];}}
function ssc_pulse_(x){var val,start,expx;x=x*ssc_pulseScale;if(x<1){val=x-(1-Math.exp(-x));}else{start=Math.exp(-1);x-=1;expx=1-Math.exp(-x);val=start+(expx*(1-start));}
return val*ssc_pulseNormalize;}
function ssc_pulse(x){if(x>=1)return 1;if(x<=0)return 0;if(ssc_pulseNormalize==1){ssc_pulseNormalize/=ssc_pulse_(1);}
return ssc_pulse_(x);}
if(true){ssc_addEvent("mousedown",ssc_mousedown);ssc_addEvent("mousewheel",ssc_wheel);ssc_addEvent("load",ssc_init);};(function($){var $window=$(window);var windowHeight=$window.height();$window.resize(function(){windowHeight=$window.height();});$.fn.parallax=function(xpos,speedFactor,outerHeight){var $this=$(this);var getHeight;var firstTop;var paddingTop=0;$this.each(function(){firstTop=$this.offset().top;});if(outerHeight){getHeight=function(jqo){return jqo.outerHeight(true);};}else{getHeight=function(jqo){return jqo.height();};}
if(arguments.length<1||xpos===null)xpos="50%";if(arguments.length<2||speedFactor===null)speedFactor=0.1;if(arguments.length<3||outerHeight===null)outerHeight=true;function update(){var pos=$window.scrollTop();$this.each(function(){var $element=$(this);var top=$element.offset().top;var height=getHeight($element);if(top+height<pos||top>pos+windowHeight){return;}
$this.css('backgroundPosition',xpos+" "+Math.round((firstTop-pos)*speedFactor)+"px");});}
$window.bind('scroll',update).resize(update);update();};})(jQuery);;(function(window){var slice=Array.prototype.slice;function noop(){}
function defineBridget($){if(!$){return;}
function addOptionMethod(PluginClass){if(PluginClass.prototype.option){return;}
PluginClass.prototype.option=function(opts){if(!$.isPlainObject(opts)){return;}
this.options=$.extend(true,this.options,opts);};}
var logError=typeof console==='undefined'?noop:function(message){console.error(message);};function bridge(namespace,PluginClass){$.fn[namespace]=function(options){if(typeof options==='string'){var args=slice.call(arguments,1);for(var i=0,len=this.length;i<len;i++){var elem=this[i];var instance=$.data(elem,namespace);if(!instance){logError("cannot call methods on "+namespace+" prior to initialization; "+"attempted to call '"+options+"'");continue;}
if(!$.isFunction(instance[options])||options.charAt(0)==='_'){logError("no such method '"+options+"' for "+namespace+" instance");continue;}
var returnValue=instance[options].apply(instance,args);if(returnValue!==undefined){return returnValue;}}
return this;}else{return this.each(function(){var instance=$.data(this,namespace);if(instance){instance.option(options);instance._init();}else{instance=new PluginClass(this,options);$.data(this,namespace,instance);}});}};}
$.bridget=function(namespace,PluginClass){addOptionMethod(PluginClass);bridge(namespace,PluginClass);};return $.bridget;}
if(typeof define==='function'&&define.amd){define('jquery-bridget/jquery.bridget',['jquery'],defineBridget);}else{defineBridget(window.jQuery);}})(window);(function(window){var docElem=document.documentElement;var bind=function(){};function getIEEvent(obj){var event=window.event;event.target=event.target||event.srcElement||obj;return event;}
if(docElem.addEventListener){bind=function(obj,type,fn){obj.addEventListener(type,fn,false);};}else if(docElem.attachEvent){bind=function(obj,type,fn){obj[type+fn]=fn.handleEvent?function(){var event=getIEEvent(obj);fn.handleEvent.call(fn,event);}:function(){var event=getIEEvent(obj);fn.call(obj,event);};obj.attachEvent("on"+type,obj[type+fn]);};}
var unbind=function(){};if(docElem.removeEventListener){unbind=function(obj,type,fn){obj.removeEventListener(type,fn,false);};}else if(docElem.detachEvent){unbind=function(obj,type,fn){obj.detachEvent("on"+type,obj[type+fn]);try{delete obj[type+fn];}catch(err){obj[type+fn]=undefined;}};}
var eventie={bind:bind,unbind:unbind};if(typeof define==='function'&&define.amd){define('eventie/eventie',eventie);}else if(typeof exports==='object'){module.exports=eventie;}else{window.eventie=eventie;}})(this);(function(window){var document=window.document;var queue=[];function docReady(fn){if(typeof fn!=='function'){return;}
if(docReady.isReady){fn();}else{queue.push(fn);}}
docReady.isReady=false;function init(event){var isIE8NotReady=event.type==='readystatechange'&&document.readyState!=='complete';if(docReady.isReady||isIE8NotReady){return;}
docReady.isReady=true;for(var i=0,len=queue.length;i<len;i++){var fn=queue[i];fn();}}
function defineDocReady(eventie){eventie.bind(document,'DOMContentLoaded',init);eventie.bind(document,'readystatechange',init);eventie.bind(window,'load',init);return docReady;}
if(typeof define==='function'&&define.amd){docReady.isReady=typeof requirejs==='function';define('doc-ready/doc-ready',['eventie/eventie'],defineDocReady);}else{window.docReady=defineDocReady(window.eventie);}})(this);(function(){function EventEmitter(){}
var proto=EventEmitter.prototype;var exports=this;var originalGlobalValue=exports.EventEmitter;function indexOfListener(listeners,listener){var i=listeners.length;while(i--){if(listeners[i].listener===listener){return i;}}
return-1;}
function alias(name){return function aliasClosure(){return this[name].apply(this,arguments);};}
proto.getListeners=function getListeners(evt){var events=this._getEvents();var response;var key;if(evt instanceof RegExp){response={};for(key in events){if(events.hasOwnProperty(key)&&evt.test(key)){response[key]=events[key];}}}
else{response=events[evt]||(events[evt]=[]);}
return response;};proto.flattenListeners=function flattenListeners(listeners){var flatListeners=[];var i;for(i=0;i<listeners.length;i+=1){flatListeners.push(listeners[i].listener);}
return flatListeners;};proto.getListenersAsObject=function getListenersAsObject(evt){var listeners=this.getListeners(evt);var response;if(listeners instanceof Array){response={};response[evt]=listeners;}
return response||listeners;};proto.addListener=function addListener(evt,listener){var listeners=this.getListenersAsObject(evt);var listenerIsWrapped=typeof listener==='object';var key;for(key in listeners){if(listeners.hasOwnProperty(key)&&indexOfListener(listeners[key],listener)===-1){listeners[key].push(listenerIsWrapped?listener:{listener:listener,once:false});}}
return this;};proto.on=alias('addListener');proto.addOnceListener=function addOnceListener(evt,listener){return this.addListener(evt,{listener:listener,once:true});};proto.once=alias('addOnceListener');proto.defineEvent=function defineEvent(evt){this.getListeners(evt);return this;};proto.defineEvents=function defineEvents(evts){for(var i=0;i<evts.length;i+=1){this.defineEvent(evts[i]);}
return this;};proto.removeListener=function removeListener(evt,listener){var listeners=this.getListenersAsObject(evt);var index;var key;for(key in listeners){if(listeners.hasOwnProperty(key)){index=indexOfListener(listeners[key],listener);if(index!==-1){listeners[key].splice(index,1);}}}
return this;};proto.off=alias('removeListener');proto.addListeners=function addListeners(evt,listeners){return this.manipulateListeners(false,evt,listeners);};proto.removeListeners=function removeListeners(evt,listeners){return this.manipulateListeners(true,evt,listeners);};proto.manipulateListeners=function manipulateListeners(remove,evt,listeners){var i;var value;var single=remove?this.removeListener:this.addListener;var multiple=remove?this.removeListeners:this.addListeners;if(typeof evt==='object'&&!(evt instanceof RegExp)){for(i in evt){if(evt.hasOwnProperty(i)&&(value=evt[i])){if(typeof value==='function'){single.call(this,i,value);}
else{multiple.call(this,i,value);}}}}
else{i=listeners.length;while(i--){single.call(this,evt,listeners[i]);}}
return this;};proto.removeEvent=function removeEvent(evt){var type=typeof evt;var events=this._getEvents();var key;if(type==='string'){delete events[evt];}
else if(evt instanceof RegExp){for(key in events){if(events.hasOwnProperty(key)&&evt.test(key)){delete events[key];}}}
else{delete this._events;}
return this;};proto.removeAllListeners=alias('removeEvent');proto.emitEvent=function emitEvent(evt,args){var listeners=this.getListenersAsObject(evt);var listener;var i;var key;var response;for(key in listeners){if(listeners.hasOwnProperty(key)){i=listeners[key].length;while(i--){listener=listeners[key][i];if(listener.once===true){this.removeListener(evt,listener.listener);}
response=listener.listener.apply(this,args||[]);if(response===this._getOnceReturnValue()){this.removeListener(evt,listener.listener);}}}}
return this;};proto.trigger=alias('emitEvent');proto.emit=function emit(evt){var args=Array.prototype.slice.call(arguments,1);return this.emitEvent(evt,args);};proto.setOnceReturnValue=function setOnceReturnValue(value){this._onceReturnValue=value;return this;};proto._getOnceReturnValue=function _getOnceReturnValue(){if(this.hasOwnProperty('_onceReturnValue')){return this._onceReturnValue;}
else{return true;}};proto._getEvents=function _getEvents(){return this._events||(this._events={});};EventEmitter.noConflict=function noConflict(){exports.EventEmitter=originalGlobalValue;return EventEmitter;};if(typeof define==='function'&&define.amd){define('eventEmitter/EventEmitter',[],function(){return EventEmitter;});}
else if(typeof module==='object'&&module.exports){module.exports=EventEmitter;}
else{this.EventEmitter=EventEmitter;}}.call(this));(function(window){var prefixes='Webkit Moz ms Ms O'.split(' ');var docElemStyle=document.documentElement.style;function getStyleProperty(propName){if(!propName){return;}
if(typeof docElemStyle[propName]==='string'){return propName;}
propName=propName.charAt(0).toUpperCase()+propName.slice(1);var prefixed;for(var i=0,len=prefixes.length;i<len;i++){prefixed=prefixes[i]+propName;if(typeof docElemStyle[prefixed]==='string'){return prefixed;}}}
if(typeof define==='function'&&define.amd){define('get-style-property/get-style-property',[],function(){return getStyleProperty;});}else if(typeof exports==='object'){module.exports=getStyleProperty;}else{window.getStyleProperty=getStyleProperty;}})(window);(function(window,undefined){var getComputedStyle=window.getComputedStyle;var getStyle=getComputedStyle?function(elem){return getComputedStyle(elem,null);}:function(elem){return elem.currentStyle;};function getStyleSize(value){var num=parseFloat(value);var isValid=value.indexOf('%')===-1&&!isNaN(num);return isValid&&num;}
var measurements=['paddingLeft','paddingRight','paddingTop','paddingBottom','marginLeft','marginRight','marginTop','marginBottom','borderLeftWidth','borderRightWidth','borderTopWidth','borderBottomWidth'];function getZeroSize(){var size={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0};for(var i=0,len=measurements.length;i<len;i++){var measurement=measurements[i];size[measurement]=0;}
return size;}
function defineGetSize(getStyleProperty){var boxSizingProp=getStyleProperty('boxSizing');var isBoxSizeOuter;(function(){if(!boxSizingProp){return;}
var div=document.createElement('div');div.style.width='200px';div.style.padding='1px 2px 3px 4px';div.style.borderStyle='solid';div.style.borderWidth='1px 2px 3px 4px';div.style[boxSizingProp]='border-box';var body=document.body||document.documentElement;body.appendChild(div);var style=getStyle(div);isBoxSizeOuter=getStyleSize(style.width)===200;body.removeChild(div);})();function getSize(elem){if(typeof elem==='string'){elem=document.querySelector(elem);}
if(!elem||typeof elem!=='object'||!elem.nodeType){return;}
var style=getStyle(elem);if(style.display==='none'){return getZeroSize();}
var size={};size.width=elem.offsetWidth;size.height=elem.offsetHeight;var isBorderBox=size.isBorderBox=!!(boxSizingProp&&style[boxSizingProp]&&style[boxSizingProp]==='border-box');for(var i=0,len=measurements.length;i<len;i++){var measurement=measurements[i];var value=style[measurement];value=mungeNonPixel(elem,value);var num=parseFloat(value);size[measurement]=!isNaN(num)?num:0;}
var paddingWidth=size.paddingLeft+size.paddingRight;var paddingHeight=size.paddingTop+size.paddingBottom;var marginWidth=size.marginLeft+size.marginRight;var marginHeight=size.marginTop+size.marginBottom;var borderWidth=size.borderLeftWidth+size.borderRightWidth;var borderHeight=size.borderTopWidth+size.borderBottomWidth;var isBorderBoxSizeOuter=isBorderBox&&isBoxSizeOuter;var styleWidth=getStyleSize(style.width);if(styleWidth!==false){size.width=styleWidth+
(isBorderBoxSizeOuter?0:paddingWidth+borderWidth);}
var styleHeight=getStyleSize(style.height);if(styleHeight!==false){size.height=styleHeight+
(isBorderBoxSizeOuter?0:paddingHeight+borderHeight);}
size.innerWidth=size.width-(paddingWidth+borderWidth);size.innerHeight=size.height-(paddingHeight+borderHeight);size.outerWidth=size.width+marginWidth;size.outerHeight=size.height+marginHeight;return size;}
function mungeNonPixel(elem,value){if(getComputedStyle||value.indexOf('%')===-1){return value;}
var style=elem.style;var left=style.left;var rs=elem.runtimeStyle;var rsLeft=rs&&rs.left;if(rsLeft){rs.left=elem.currentStyle.left;}
style.left=value;value=style.pixelLeft;style.left=left;if(rsLeft){rs.left=rsLeft;}
return value;}
return getSize;}
if(typeof define==='function'&&define.amd){define('get-size/get-size',['get-style-property/get-style-property'],defineGetSize);}else if(typeof exports==='object'){module.exports=defineGetSize(require('get-style-property'));}else{window.getSize=defineGetSize(window.getStyleProperty);}})(window);(function(global,ElemProto){var matchesMethod=(function(){if(ElemProto.matchesSelector){return'matchesSelector';}
var prefixes=['webkit','moz','ms','o'];for(var i=0,len=prefixes.length;i<len;i++){var prefix=prefixes[i];var method=prefix+'MatchesSelector';if(ElemProto[method]){return method;}}})();function match(elem,selector){return elem[matchesMethod](selector);}
function checkParent(elem){if(elem.parentNode){return;}
var fragment=document.createDocumentFragment();fragment.appendChild(elem);}
function query(elem,selector){checkParent(elem);var elems=elem.parentNode.querySelectorAll(selector);for(var i=0,len=elems.length;i<len;i++){if(elems[i]===elem){return true;}}
return false;}
function matchChild(elem,selector){checkParent(elem);return match(elem,selector);}
var matchesSelector;if(matchesMethod){var div=document.createElement('div');var supportsOrphans=match(div,'div');matchesSelector=supportsOrphans?match:matchChild;}else{matchesSelector=query;}
if(typeof define==='function'&&define.amd){define('matches-selector/matches-selector',[],function(){return matchesSelector;});}else{window.matchesSelector=matchesSelector;}})(this,Element.prototype);(function(window){var defView=document.defaultView;var getStyle=defView&&defView.getComputedStyle?function(elem){return defView.getComputedStyle(elem,null);}:function(elem){return elem.currentStyle;};function extend(a,b){for(var prop in b){a[prop]=b[prop];}
return a;}
function isEmptyObj(obj){for(var prop in obj){return false;}
prop=null;return true;}
function toDash(str){return str.replace(/([A-Z])/g,function($1){return'-'+$1.toLowerCase();});}
function outlayerItemDefinition(EventEmitter,getSize,getStyleProperty){var transitionProperty=getStyleProperty('transition');var transformProperty=getStyleProperty('transform');var supportsCSS3=transitionProperty&&transformProperty;var is3d=!!getStyleProperty('perspective');var transitionEndEvent={WebkitTransition:'webkitTransitionEnd',MozTransition:'transitionend',OTransition:'otransitionend',transition:'transitionend'}[transitionProperty];var prefixableProperties=['transform','transition','transitionDuration','transitionProperty'];var vendorProperties=(function(){var cache={};for(var i=0,len=prefixableProperties.length;i<len;i++){var prop=prefixableProperties[i];var supportedProp=getStyleProperty(prop);if(supportedProp&&supportedProp!==prop){cache[prop]=supportedProp;}}
return cache;})();function Item(element,layout){if(!element){return;}
this.element=element;this.layout=layout;this.position={x:0,y:0};this._create();}
extend(Item.prototype,EventEmitter.prototype);Item.prototype._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}};this.css({position:'absolute'});};Item.prototype.handleEvent=function(event){var method='on'+event.type;if(this[method]){this[method](event);}};Item.prototype.getSize=function(){this.size=getSize(this.element);};Item.prototype.css=function(style){var elemStyle=this.element.style;for(var prop in style){var supportedProp=vendorProperties[prop]||prop;elemStyle[supportedProp]=style[prop];}};Item.prototype.getPosition=function(){var style=getStyle(this.element);var layoutOptions=this.layout.options;var isOriginLeft=layoutOptions.isOriginLeft;var isOriginTop=layoutOptions.isOriginTop;var x=parseInt(style[isOriginLeft?'left':'right'],10);var y=parseInt(style[isOriginTop?'top':'bottom'],10);x=isNaN(x)?0:x;y=isNaN(y)?0:y;var layoutSize=this.layout.size;x-=isOriginLeft?layoutSize.paddingLeft:layoutSize.paddingRight;y-=isOriginTop?layoutSize.paddingTop:layoutSize.paddingBottom;this.position.x=x;this.position.y=y;};Item.prototype.layoutPosition=function(){var layoutSize=this.layout.size;var layoutOptions=this.layout.options;var style={};if(layoutOptions.isOriginLeft){style.left=(this.position.x+layoutSize.paddingLeft)+'px';style.right='';}else{style.right=(this.position.x+layoutSize.paddingRight)+'px';style.left='';}
if(layoutOptions.isOriginTop){style.top=(this.position.y+layoutSize.paddingTop)+'px';style.bottom='';}else{style.bottom=(this.position.y+layoutSize.paddingBottom)+'px';style.top='';}
this.css(style);this.emitEvent('layout',[this]);};var translate=is3d?function(x,y){return'translate3d('+x+'px, '+y+'px, 0)';}:function(x,y){return'translate('+x+'px, '+y+'px)';};Item.prototype._transitionTo=function(x,y){this.getPosition();var curX=this.position.x;var curY=this.position.y;var compareX=parseInt(x,10);var compareY=parseInt(y,10);var didNotMove=compareX===this.position.x&&compareY===this.position.y;this.setPosition(x,y);if(didNotMove&&!this.isTransitioning){this.layoutPosition();return;}
var transX=x-curX;var transY=y-curY;var transitionStyle={};var layoutOptions=this.layout.options;transX=layoutOptions.isOriginLeft?transX:-transX;transY=layoutOptions.isOriginTop?transY:-transY;transitionStyle.transform=translate(transX,transY);this.transition({to:transitionStyle,onTransitionEnd:{transform:this.layoutPosition},isCleaning:true});};Item.prototype.goTo=function(x,y){this.setPosition(x,y);this.layoutPosition();};Item.prototype.moveTo=supportsCSS3?Item.prototype._transitionTo:Item.prototype.goTo;Item.prototype.setPosition=function(x,y){this.position.x=parseInt(x,10);this.position.y=parseInt(y,10);};Item.prototype._nonTransition=function(args){this.css(args.to);if(args.isCleaning){this._removeStyles(args.to);}
for(var prop in args.onTransitionEnd){args.onTransitionEnd[prop].call(this);}};Item.prototype._transition=function(args){if(!parseFloat(this.layout.options.transitionDuration)){this._nonTransition(args);return;}
var _transition=this._transn;for(var prop in args.onTransitionEnd){_transition.onEnd[prop]=args.onTransitionEnd[prop];}
for(prop in args.to){_transition.ingProperties[prop]=true;if(args.isCleaning){_transition.clean[prop]=true;}}
if(args.from){this.css(args.from);var h=this.element.offsetHeight;h=null;}
this.enableTransition(args.to);this.css(args.to);this.isTransitioning=true;};var itemTransitionProperties=transformProperty&&(toDash(transformProperty)+',opacity');Item.prototype.enableTransition=function(){if(this.isTransitioning){return;}
this.css({transitionProperty:itemTransitionProperties,transitionDuration:this.layout.options.transitionDuration});this.element.addEventListener(transitionEndEvent,this,false);};Item.prototype.transition=Item.prototype[transitionProperty?'_transition':'_nonTransition'];Item.prototype.onwebkitTransitionEnd=function(event){this.ontransitionend(event);};Item.prototype.onotransitionend=function(event){this.ontransitionend(event);};var dashedVendorProperties={'-webkit-transform':'transform','-moz-transform':'transform','-o-transform':'transform'};Item.prototype.ontransitionend=function(event){if(event.target!==this.element){return;}
var _transition=this._transn;var propertyName=dashedVendorProperties[event.propertyName]||event.propertyName;delete _transition.ingProperties[propertyName];if(isEmptyObj(_transition.ingProperties)){this.disableTransition();}
if(propertyName in _transition.clean){this.element.style[event.propertyName]='';delete _transition.clean[propertyName];}
if(propertyName in _transition.onEnd){var onTransitionEnd=_transition.onEnd[propertyName];onTransitionEnd.call(this);delete _transition.onEnd[propertyName];}
this.emitEvent('transitionEnd',[this]);};Item.prototype.disableTransition=function(){this.removeTransitionStyles();this.element.removeEventListener(transitionEndEvent,this,false);this.isTransitioning=false;};Item.prototype._removeStyles=function(style){var cleanStyle={};for(var prop in style){cleanStyle[prop]='';}
this.css(cleanStyle);};var cleanTransitionStyle={transitionProperty:'',transitionDuration:''};Item.prototype.removeTransitionStyles=function(){this.css(cleanTransitionStyle);};Item.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element);this.emitEvent('remove',[this]);};Item.prototype.remove=function(){if(!transitionProperty||!parseFloat(this.layout.options.transitionDuration)){this.removeElem();return;}
var _this=this;this.on('transitionEnd',function(){_this.removeElem();return true;});this.hide();};Item.prototype.reveal=function(){delete this.isHidden;this.css({display:''});var options=this.layout.options;this.transition({from:options.hiddenStyle,to:options.visibleStyle,isCleaning:true});};Item.prototype.hide=function(){this.isHidden=true;this.css({display:''});var options=this.layout.options;this.transition({from:options.visibleStyle,to:options.hiddenStyle,isCleaning:true,onTransitionEnd:{opacity:function(){if(this.isHidden){this.css({display:'none'});}}}});};Item.prototype.destroy=function(){this.css({position:'',left:'',right:'',top:'',bottom:'',transition:'',transform:''});};return Item;}
if(typeof define==='function'&&define.amd){define('outlayer/item',['eventEmitter/EventEmitter','get-size/get-size','get-style-property/get-style-property'],outlayerItemDefinition);}else{window.Outlayer={};window.Outlayer.Item=outlayerItemDefinition(window.EventEmitter,window.getSize,window.getStyleProperty);}})(window);(function(window){var document=window.document;var console=window.console;var jQuery=window.jQuery;var noop=function(){};function extend(a,b){for(var prop in b){a[prop]=b[prop];}
return a;}
var objToString=Object.prototype.toString;function isArray(obj){return objToString.call(obj)==='[object Array]';}
function makeArray(obj){var ary=[];if(isArray(obj)){ary=obj;}else if(obj&&typeof obj.length==='number'){for(var i=0,len=obj.length;i<len;i++){ary.push(obj[i]);}}else{ary.push(obj);}
return ary;}
var isElement=(typeof HTMLElement==='object')?function isElementDOM2(obj){return obj instanceof HTMLElement;}:function isElementQuirky(obj){return obj&&typeof obj==='object'&&obj.nodeType===1&&typeof obj.nodeName==='string';};var indexOf=Array.prototype.indexOf?function(ary,obj){return ary.indexOf(obj);}:function(ary,obj){for(var i=0,len=ary.length;i<len;i++){if(ary[i]===obj){return i;}}
return-1;};function removeFrom(obj,ary){var index=indexOf(ary,obj);if(index!==-1){ary.splice(index,1);}}
function toDashed(str){return str.replace(/(.)([A-Z])/g,function(match,$1,$2){return $1+'-'+$2;}).toLowerCase();}
function outlayerDefinition(eventie,docReady,EventEmitter,getSize,matchesSelector,Item){var GUID=0;var instances={};function Outlayer(element,options){if(typeof element==='string'){element=document.querySelector(element);}
if(!element||!isElement(element)){if(console){console.error('Bad '+this.constructor.namespace+' element: '+element);}
return;}
this.element=element;this.options=extend({},this.options);this.option(options);var id=++GUID;this.element.outlayerGUID=id;instances[id]=this;this._create();if(this.options.isInitLayout){this.layout();}}
Outlayer.namespace='outlayer';Outlayer.Item=Item;Outlayer.prototype.options={containerStyle:{position:'relative'},isInitLayout:true,isOriginLeft:true,isOriginTop:true,isResizeBound:true,transitionDuration:'0.4s',hiddenStyle:{opacity:0,transform:'scale(0.001)'},visibleStyle:{opacity:1,transform:'scale(1)'}};extend(Outlayer.prototype,EventEmitter.prototype);Outlayer.prototype.option=function(opts){extend(this.options,opts);};Outlayer.prototype._create=function(){this.reloadItems();this.stamps=[];this.stamp(this.options.stamp);extend(this.element.style,this.options.containerStyle);if(this.options.isResizeBound){this.bindResize();}};Outlayer.prototype.reloadItems=function(){this.items=this._itemize(this.element.children);};Outlayer.prototype._itemize=function(elems){var itemElems=this._filterFindItemElements(elems);var Item=this.constructor.Item;var items=[];for(var i=0,len=itemElems.length;i<len;i++){var elem=itemElems[i];var item=new Item(elem,this);items.push(item);}
return items;};Outlayer.prototype._filterFindItemElements=function(elems){elems=makeArray(elems);var itemSelector=this.options.itemSelector;var itemElems=[];for(var i=0,len=elems.length;i<len;i++){var elem=elems[i];if(!isElement(elem)){continue;}
if(itemSelector){if(matchesSelector(elem,itemSelector)){itemElems.push(elem);}
var childElems=elem.querySelectorAll(itemSelector);for(var j=0,jLen=childElems.length;j<jLen;j++){itemElems.push(childElems[j]);}}else{itemElems.push(elem);}}
return itemElems;};Outlayer.prototype.getItemElements=function(){var elems=[];for(var i=0,len=this.items.length;i<len;i++){elems.push(this.items[i].element);}
return elems;};Outlayer.prototype.layout=function(){this._resetLayout();this._manageStamps();var isInstant=this.options.isLayoutInstant!==undefined?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,isInstant);this._isLayoutInited=true;};Outlayer.prototype._init=Outlayer.prototype.layout;Outlayer.prototype._resetLayout=function(){this.getSize();};Outlayer.prototype.getSize=function(){this.size=getSize(this.element);};Outlayer.prototype._getMeasurement=function(measurement,size){var option=this.options[measurement];var elem;if(!option){this[measurement]=0;}else{if(typeof option==='string'){elem=this.element.querySelector(option);}else if(isElement(option)){elem=option;}
this[measurement]=elem?getSize(elem)[size]:option;}};Outlayer.prototype.layoutItems=function(items,isInstant){items=this._getItemsForLayout(items);this._layoutItems(items,isInstant);this._postLayout();};Outlayer.prototype._getItemsForLayout=function(items){var layoutItems=[];for(var i=0,len=items.length;i<len;i++){var item=items[i];if(!item.isIgnored){layoutItems.push(item);}}
return layoutItems;};Outlayer.prototype._layoutItems=function(items,isInstant){var _this=this;function onItemsLayout(){_this.emitEvent('layoutComplete',[_this,items]);}
if(!items||!items.length){onItemsLayout();return;}
this._itemsOn(items,'layout',onItemsLayout);var queue=[];for(var i=0,len=items.length;i<len;i++){var item=items[i];var position=this._getItemLayoutPosition(item);position.item=item;position.isInstant=isInstant||item.isLayoutInstant;queue.push(position);}
this._processLayoutQueue(queue);};Outlayer.prototype._getItemLayoutPosition=function(){return{x:0,y:0};};Outlayer.prototype._processLayoutQueue=function(queue){for(var i=0,len=queue.length;i<len;i++){var obj=queue[i];this._positionItem(obj.item,obj.x,obj.y,obj.isInstant);}};Outlayer.prototype._positionItem=function(item,x,y,isInstant){if(isInstant){item.goTo(x,y);}else{item.moveTo(x,y);}};Outlayer.prototype._postLayout=function(){var size=this._getContainerSize();if(size){this._setContainerMeasure(size.width,true);this._setContainerMeasure(size.height,false);}};Outlayer.prototype._getContainerSize=noop;Outlayer.prototype._setContainerMeasure=function(measure,isWidth){if(measure===undefined){return;}
var elemSize=this.size;if(elemSize.isBorderBox){measure+=isWidth?elemSize.paddingLeft+elemSize.paddingRight+
elemSize.borderLeftWidth+elemSize.borderRightWidth:elemSize.paddingBottom+elemSize.paddingTop+
elemSize.borderTopWidth+elemSize.borderBottomWidth;}
measure=Math.max(measure,0);this.element.style[isWidth?'width':'height']=measure+'px';};Outlayer.prototype._itemsOn=function(items,eventName,callback){var doneCount=0;var count=items.length;var _this=this;function tick(){doneCount++;if(doneCount===count){callback.call(_this);}
return true;}
for(var i=0,len=items.length;i<len;i++){var item=items[i];item.on(eventName,tick);}};Outlayer.prototype.ignore=function(elem){var item=this.getItem(elem);if(item){item.isIgnored=true;}};Outlayer.prototype.unignore=function(elem){var item=this.getItem(elem);if(item){delete item.isIgnored;}};Outlayer.prototype.stamp=function(elems){elems=this._find(elems);if(!elems){return;}
this.stamps=this.stamps.concat(elems);for(var i=0,len=elems.length;i<len;i++){var elem=elems[i];this.ignore(elem);}};Outlayer.prototype.unstamp=function(elems){elems=this._find(elems);if(!elems){return;}
for(var i=0,len=elems.length;i<len;i++){var elem=elems[i];removeFrom(elem,this.stamps);this.unignore(elem);}};Outlayer.prototype._find=function(elems){if(!elems){return;}
if(typeof elems==='string'){elems=this.element.querySelectorAll(elems);}
elems=makeArray(elems);return elems;};Outlayer.prototype._manageStamps=function(){if(!this.stamps||!this.stamps.length){return;}
this._getBoundingRect();for(var i=0,len=this.stamps.length;i<len;i++){var stamp=this.stamps[i];this._manageStamp(stamp);}};Outlayer.prototype._getBoundingRect=function(){var boundingRect=this.element.getBoundingClientRect();var size=this.size;this._boundingRect={left:boundingRect.left+size.paddingLeft+size.borderLeftWidth,top:boundingRect.top+size.paddingTop+size.borderTopWidth,right:boundingRect.right-(size.paddingRight+size.borderRightWidth),bottom:boundingRect.bottom-(size.paddingBottom+size.borderBottomWidth)};};Outlayer.prototype._manageStamp=noop;Outlayer.prototype._getElementOffset=function(elem){var boundingRect=elem.getBoundingClientRect();var thisRect=this._boundingRect;var size=getSize(elem);var offset={left:boundingRect.left-thisRect.left-size.marginLeft,top:boundingRect.top-thisRect.top-size.marginTop,right:thisRect.right-boundingRect.right-size.marginRight,bottom:thisRect.bottom-boundingRect.bottom-size.marginBottom};return offset;};Outlayer.prototype.handleEvent=function(event){var method='on'+event.type;if(this[method]){this[method](event);}};Outlayer.prototype.bindResize=function(){if(this.isResizeBound){return;}
eventie.bind(window,'resize',this);this.isResizeBound=true;};Outlayer.prototype.unbindResize=function(){eventie.unbind(window,'resize',this);this.isResizeBound=false;};Outlayer.prototype.onresize=function(){if(this.resizeTimeout){clearTimeout(this.resizeTimeout);}
var _this=this;function delayed(){_this.resize();delete _this.resizeTimeout;}
this.resizeTimeout=setTimeout(delayed,100);};Outlayer.prototype.resize=function(){var size=getSize(this.element);var hasSizes=this.size&&size;if(hasSizes&&size.innerWidth===this.size.innerWidth){return;}
this.layout();};Outlayer.prototype.addItems=function(elems){var items=this._itemize(elems);if(items.length){this.items=this.items.concat(items);}
return items;};Outlayer.prototype.appended=function(elems){var items=this.addItems(elems);if(!items.length){return;}
this.layoutItems(items,true);this.reveal(items);};Outlayer.prototype.prepended=function(elems){var items=this._itemize(elems);if(!items.length){return;}
var previousItems=this.items.slice(0);this.items=items.concat(previousItems);this._resetLayout();this._manageStamps();this.layoutItems(items,true);this.reveal(items);this.layoutItems(previousItems);};Outlayer.prototype.reveal=function(items){var len=items&&items.length;if(!len){return;}
for(var i=0;i<len;i++){var item=items[i];item.reveal();}};Outlayer.prototype.hide=function(items){var len=items&&items.length;if(!len){return;}
for(var i=0;i<len;i++){var item=items[i];item.hide();}};Outlayer.prototype.getItem=function(elem){for(var i=0,len=this.items.length;i<len;i++){var item=this.items[i];if(item.element===elem){return item;}}};Outlayer.prototype.getItems=function(elems){if(!elems||!elems.length){return;}
var items=[];for(var i=0,len=elems.length;i<len;i++){var elem=elems[i];var item=this.getItem(elem);if(item){items.push(item);}}
return items;};Outlayer.prototype.remove=function(elems){elems=makeArray(elems);var removeItems=this.getItems(elems);if(!removeItems||!removeItems.length){return;}
this._itemsOn(removeItems,'remove',function(){this.emitEvent('removeComplete',[this,removeItems]);});for(var i=0,len=removeItems.length;i<len;i++){var item=removeItems[i];item.remove();removeFrom(item,this.items);}};Outlayer.prototype.destroy=function(){var style=this.element.style;style.height='';style.position='';style.width='';for(var i=0,len=this.items.length;i<len;i++){var item=this.items[i];item.destroy();}
this.unbindResize();delete this.element.outlayerGUID;if(jQuery){jQuery.removeData(this.element,this.constructor.namespace);}};Outlayer.data=function(elem){var id=elem&&elem.outlayerGUID;return id&&instances[id];};function copyOutlayerProto(obj,property){obj.prototype[property]=extend({},Outlayer.prototype[property]);}
Outlayer.create=function(namespace,options){function Layout(){Outlayer.apply(this,arguments);}
if(Object.create){Layout.prototype=Object.create(Outlayer.prototype);}else{extend(Layout.prototype,Outlayer.prototype);}
Layout.prototype.constructor=Layout;copyOutlayerProto(Layout,'options');extend(Layout.prototype.options,options);Layout.namespace=namespace;Layout.data=Outlayer.data;Layout.Item=function LayoutItem(){Item.apply(this,arguments);};Layout.Item.prototype=new Item();docReady(function(){var dashedNamespace=toDashed(namespace);var elems=document.querySelectorAll('.js-'+dashedNamespace);var dataAttr='data-'+dashedNamespace+'-options';for(var i=0,len=elems.length;i<len;i++){var elem=elems[i];var attr=elem.getAttribute(dataAttr);var options;try{options=attr&&JSON.parse(attr);}catch(error){if(console){console.error('Error parsing '+dataAttr+' on '+
elem.nodeName.toLowerCase()+(elem.id?'#'+elem.id:'')+': '+
error);}
continue;}
var instance=new Layout(elem,options);if(jQuery){jQuery.data(elem,namespace,instance);}}});if(jQuery&&jQuery.bridget){jQuery.bridget(namespace,Layout);}
return Layout;};Outlayer.Item=Item;return Outlayer;}
if(typeof define==='function'&&define.amd){define('outlayer/outlayer',['eventie/eventie','doc-ready/doc-ready','eventEmitter/EventEmitter','get-size/get-size','matches-selector/matches-selector','./item'],outlayerDefinition);}else{window.Outlayer=outlayerDefinition(window.eventie,window.docReady,window.EventEmitter,window.getSize,window.matchesSelector,window.Outlayer.Item);}})(window);(function(window){var indexOf=Array.prototype.indexOf?function(items,value){return items.indexOf(value);}:function(items,value){for(var i=0,len=items.length;i<len;i++){var item=items[i];if(item===value){return i;}}
return-1;};function masonryDefinition(Outlayer,getSize){var Masonry=Outlayer.create('masonry');Masonry.prototype._resetLayout=function(){this.getSize();this._getMeasurement('columnWidth','outerWidth');this._getMeasurement('gutter','outerWidth');this.measureColumns();var i=this.cols;this.colYs=[];while(i--){this.colYs.push(0);}
this.maxY=0;};Masonry.prototype.measureColumns=function(){this.getContainerWidth();if(!this.columnWidth){var firstItem=this.items[0];var firstItemElem=firstItem&&firstItem.element;this.columnWidth=firstItemElem&&getSize(firstItemElem).outerWidth||this.containerWidth;}
this.columnWidth+=this.gutter;this.cols=Math.floor((this.containerWidth+this.gutter)/this.columnWidth);this.cols=Math.max(this.cols,1);};Masonry.prototype.getContainerWidth=function(){var container=this.options.isFitWidth?this.element.parentNode:this.element;var size=getSize(container);this.containerWidth=size&&size.innerWidth;};Masonry.prototype._getItemLayoutPosition=function(item){item.getSize();var remainder=item.size.outerWidth%this.columnWidth;var mathMethod=remainder&&remainder<1?'round':'ceil';var colSpan=Math[mathMethod](item.size.outerWidth/this.columnWidth);colSpan=Math.min(colSpan,this.cols);var colGroup=this._getColGroup(colSpan);var minimumY=Math.min.apply(Math,colGroup);var shortColIndex=indexOf(colGroup,minimumY);var position={x:this.columnWidth*shortColIndex,y:minimumY};var setHeight=minimumY+item.size.outerHeight;var setSpan=this.cols+1-colGroup.length;for(var i=0;i<setSpan;i++){this.colYs[shortColIndex+i]=setHeight;}
return position;};Masonry.prototype._getColGroup=function(colSpan){if(colSpan<2){return this.colYs;}
var colGroup=[];var groupCount=this.cols+1-colSpan;for(var i=0;i<groupCount;i++){var groupColYs=this.colYs.slice(i,i+colSpan);colGroup[i]=Math.max.apply(Math,groupColYs);}
return colGroup;};Masonry.prototype._manageStamp=function(stamp){var stampSize=getSize(stamp);var offset=this._getElementOffset(stamp);var firstX=this.options.isOriginLeft?offset.left:offset.right;var lastX=firstX+stampSize.outerWidth;var firstCol=Math.floor(firstX/this.columnWidth);firstCol=Math.max(0,firstCol);var lastCol=Math.floor(lastX/this.columnWidth);lastCol-=lastX%this.columnWidth?0:1;lastCol=Math.min(this.cols-1,lastCol);var stampMaxY=(this.options.isOriginTop?offset.top:offset.bottom)+
stampSize.outerHeight;for(var i=firstCol;i<=lastCol;i++){this.colYs[i]=Math.max(stampMaxY,this.colYs[i]);}};Masonry.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var size={height:this.maxY};if(this.options.isFitWidth){size.width=this._getContainerFitWidth();}
return size;};Masonry.prototype._getContainerFitWidth=function(){var unusedCols=0;var i=this.cols;while(--i){if(this.colYs[i]!==0){break;}
unusedCols++;}
return(this.cols-unusedCols)*this.columnWidth-this.gutter;};Masonry.prototype.resize=function(){var previousWidth=this.containerWidth;this.getContainerWidth();if(previousWidth===this.containerWidth){return;}
this.layout();};return Masonry;}
if(typeof define==='function'&&define.amd){define(['outlayer/outlayer','get-size/get-size'],masonryDefinition);}else{window.Masonry=masonryDefinition(window.Outlayer,window.getSize);}})(window);;(function($){$.fn.appear=function(fn,options){var settings=$.extend({data:undefined,one:true,accX:0,accY:0},options);return this.each(function(){var t=$(this);t.appeared=false;if(!fn){t.trigger('appear',settings.data);return;}
var w=$(window);var check=function(){if(!t.is(':visible')){t.appeared=false;return;}
var a=w.scrollLeft();var b=w.scrollTop();var o=t.offset();var x=o.left;var y=o.top;var ax=settings.accX;var ay=settings.accY;var th=t.height();var wh=w.height();var tw=t.width();var ww=w.width();if(y+th+ay>=b&&y<=b+wh+ay&&x+tw+ax>=a&&x<=a+ww+ax){if(!t.appeared)t.trigger('appear',settings.data);}else{t.appeared=false;}};var modifiedFn=function(){t.appeared=true;if(settings.one){w.unbind('scroll',check);var i=$.inArray(check,$.fn.appear.checks);if(i>=0)$.fn.appear.checks.splice(i,1);}
fn.apply(this,arguments);};if(settings.one)t.one('appear',settings.data,modifiedFn);else t.bind('appear',settings.data,modifiedFn);w.scroll(check);$.fn.appear.checks.push(check);(check)();});};$.extend($.fn.appear,{checks:[],timeout:null,checkAll:function(){var length=$.fn.appear.checks.length;if(length>0)while(length--)($.fn.appear.checks[length])();},run:function(){if($.fn.appear.timeout)clearTimeout($.fn.appear.timeout);$.fn.appear.timeout=setTimeout($.fn.appear.checkAll,20);}});$.each(['append','prepend','after','before','attr','removeAttr','addClass','removeClass','toggleClass','remove','css','show','hide'],function(i,n){var old=$.fn[n];if(old){$.fn[n]=function(){var r=old.apply(this,arguments);$.fn.appear.run();return r;}}});})(jQuery);;(function($){$.fn.countTo=function(options){options=options||{};return $(this).each(function(){var settings=$.extend({},$.fn.countTo.defaults,{from:$(this).data('from'),to:$(this).data('to'),speed:$(this).data('speed'),refreshInterval:$(this).data('refresh-interval'),decimals:$(this).data('decimals')},options);var loops=Math.ceil(settings.speed/settings.refreshInterval),increment=(settings.to-settings.from)/loops;var self=this,$self=$(this),loopCount=0,value=settings.from,data=$self.data('countTo')||{};$self.data('countTo',data);if(data.interval){clearInterval(data.interval);}
data.interval=setInterval(updateTimer,settings.refreshInterval);render(value);function updateTimer(){value+=increment;loopCount++;render(value);if(typeof(settings.onUpdate)=='function'){settings.onUpdate.call(self,value);}
if(loopCount>=loops){$self.removeData('countTo');clearInterval(data.interval);value=settings.to;if(typeof(settings.onComplete)=='function'){settings.onComplete.call(self,value);}}}
function render(value){var formattedValue=settings.formatter.call(self,value,settings);$self.text(formattedValue);}});};$.fn.countTo.defaults={from:0,to:0,speed:1000,refreshInterval:100,decimals:0,formatter:formatter,onUpdate:null,onComplete:null};function formatter(value,settings){return value.toFixed(settings.decimals);}}(jQuery));jQuery(document).ready(function(){if(jQuery('.noo-counter').length){jQuery('.noo-counter').appear(function(){$this=jQuery(this);$this.parent().css('opacity','1');var $max=parseFloat($this.text());$this.countTo({from:0,to:$max,speed:1500,refreshInterval:100});});}});;(function(){'use strict';function EventEmitter(){}
var proto=EventEmitter.prototype;function indexOfListener(listeners,listener){var i=listeners.length;while(i--){if(listeners[i].listener===listener){return i;}}
return-1;}
proto.getListeners=function getListeners(evt){var events=this._getEvents();var response;var key;if(typeof evt==='object'){response={};for(key in events){if(events.hasOwnProperty(key)&&evt.test(key)){response[key]=events[key];}}}
else{response=events[evt]||(events[evt]=[]);}
return response;};proto.flattenListeners=function flattenListeners(listeners){var flatListeners=[];var i;for(i=0;i<listeners.length;i+=1){flatListeners.push(listeners[i].listener);}
return flatListeners;};proto.getListenersAsObject=function getListenersAsObject(evt){var listeners=this.getListeners(evt);var response;if(listeners instanceof Array){response={};response[evt]=listeners;}
return response||listeners;};proto.addListener=function addListener(evt,listener){var listeners=this.getListenersAsObject(evt);var listenerIsWrapped=typeof listener==='object';var key;for(key in listeners){if(listeners.hasOwnProperty(key)&&indexOfListener(listeners[key],listener)===-1){listeners[key].push(listenerIsWrapped?listener:{listener:listener,once:false});}}
return this;};proto.on=proto.addListener;proto.addOnceListener=function addOnceListener(evt,listener){return this.addListener(evt,{listener:listener,once:true});};proto.once=proto.addOnceListener;proto.defineEvent=function defineEvent(evt){this.getListeners(evt);return this;};proto.defineEvents=function defineEvents(evts){for(var i=0;i<evts.length;i+=1){this.defineEvent(evts[i]);}
return this;};proto.removeListener=function removeListener(evt,listener){var listeners=this.getListenersAsObject(evt);var index;var key;for(key in listeners){if(listeners.hasOwnProperty(key)){index=indexOfListener(listeners[key],listener);if(index!==-1){listeners[key].splice(index,1);}}}
return this;};proto.off=proto.removeListener;proto.addListeners=function addListeners(evt,listeners){return this.manipulateListeners(false,evt,listeners);};proto.removeListeners=function removeListeners(evt,listeners){return this.manipulateListeners(true,evt,listeners);};proto.manipulateListeners=function manipulateListeners(remove,evt,listeners){var i;var value;var single=remove?this.removeListener:this.addListener;var multiple=remove?this.removeListeners:this.addListeners;if(typeof evt==='object'&&!(evt instanceof RegExp)){for(i in evt){if(evt.hasOwnProperty(i)&&(value=evt[i])){if(typeof value==='function'){single.call(this,i,value);}
else{multiple.call(this,i,value);}}}}
else{i=listeners.length;while(i--){single.call(this,evt,listeners[i]);}}
return this;};proto.removeEvent=function removeEvent(evt){var type=typeof evt;var events=this._getEvents();var key;if(type==='string'){delete events[evt];}
else if(type==='object'){for(key in events){if(events.hasOwnProperty(key)&&evt.test(key)){delete events[key];}}}
else{delete this._events;}
return this;};proto.emitEvent=function emitEvent(evt,args){var listeners=this.getListenersAsObject(evt);var listener;var i;var key;var response;for(key in listeners){if(listeners.hasOwnProperty(key)){i=listeners[key].length;while(i--){listener=listeners[key][i];response=listener.listener.apply(this,args||[]);if(response===this._getOnceReturnValue()||listener.once===true){this.removeListener(evt,listeners[key][i].listener);}}}}
return this;};proto.trigger=proto.emitEvent;proto.emit=function emit(evt){var args=Array.prototype.slice.call(arguments,1);return this.emitEvent(evt,args);};proto.setOnceReturnValue=function setOnceReturnValue(value){this._onceReturnValue=value;return this;};proto._getOnceReturnValue=function _getOnceReturnValue(){if(this.hasOwnProperty('_onceReturnValue')){return this._onceReturnValue;}
else{return true;}};proto._getEvents=function _getEvents(){return this._events||(this._events={});};if(typeof define==='function'&&define.amd){define(function(){return EventEmitter;});}
else if(typeof module!=='undefined'&&module.exports){module.exports=EventEmitter;}
else{this.EventEmitter=EventEmitter;}}.call(this));(function(window){'use strict';var docElem=document.documentElement;var bind=function(){};if(docElem.addEventListener){bind=function(obj,type,fn){obj.addEventListener(type,fn,false);};}else if(docElem.attachEvent){bind=function(obj,type,fn){obj[type+fn]=fn.handleEvent?function(){var event=window.event;event.target=event.target||event.srcElement;fn.handleEvent.call(fn,event);}:function(){var event=window.event;event.target=event.target||event.srcElement;fn.call(obj,event);};obj.attachEvent("on"+type,obj[type+fn]);};}
var unbind=function(){};if(docElem.removeEventListener){unbind=function(obj,type,fn){obj.removeEventListener(type,fn,false);};}else if(docElem.detachEvent){unbind=function(obj,type,fn){obj.detachEvent("on"+type,obj[type+fn]);try{delete obj[type+fn];}catch(err){obj[type+fn]=undefined;}};}
var eventie={bind:bind,unbind:unbind};if(typeof define==='function'&&define.amd){define(eventie);}else{window.eventie=eventie;}})(this);(function(window){'use strict';var $=window.jQuery;var console=window.console;var hasConsole=typeof console!=='undefined';function extend(a,b){for(var prop in b){a[prop]=b[prop];}
return a;}
var objToString=Object.prototype.toString;function isArray(obj){return objToString.call(obj)==='[object Array]';}
function makeArray(obj){var ary=[];if(isArray(obj)){ary=obj;}else if(typeof obj.length==='number'){for(var i=0,len=obj.length;i<len;i++){ary.push(obj[i]);}}else{ary.push(obj);}
return ary;}
function defineImagesLoaded(EventEmitter,eventie){function ImagesLoaded(elem,options,onAlways){if(!(this instanceof ImagesLoaded)){return new ImagesLoaded(elem,options);}
if(typeof elem==='string'){elem=document.querySelectorAll(elem);}
this.elements=makeArray(elem);this.options=extend({},this.options);if(typeof options==='function'){onAlways=options;}else{extend(this.options,options);}
if(onAlways){this.on('always',onAlways);}
this.getImages();if($){this.jqDeferred=new $.Deferred();}
var _this=this;setTimeout(function(){_this.check();});}
ImagesLoaded.prototype=new EventEmitter();ImagesLoaded.prototype.options={};ImagesLoaded.prototype.getImages=function(){this.images=[];for(var i=0,len=this.elements.length;i<len;i++){var elem=this.elements[i];if(elem.nodeName==='IMG'){this.addImage(elem);}
var childElems=elem.querySelectorAll('img');for(var j=0,jLen=childElems.length;j<jLen;j++){var img=childElems[j];this.addImage(img);}}};ImagesLoaded.prototype.addImage=function(img){var loadingImage=new LoadingImage(img);this.images.push(loadingImage);};ImagesLoaded.prototype.check=function(){var _this=this;var checkedCount=0;var length=this.images.length;this.hasAnyBroken=false;if(!length){this.complete();return;}
function onConfirm(image,message){if(_this.options.debug&&hasConsole){console.log('confirm',image,message);}
_this.progress(image);checkedCount++;if(checkedCount===length){_this.complete();}
return true;}
for(var i=0;i<length;i++){var loadingImage=this.images[i];loadingImage.on('confirm',onConfirm);loadingImage.check();}};ImagesLoaded.prototype.progress=function(image){this.hasAnyBroken=this.hasAnyBroken||!image.isLoaded;var _this=this;setTimeout(function(){_this.emit('progress',_this,image);if(_this.jqDeferred){_this.jqDeferred.notify(_this,image);}});};ImagesLoaded.prototype.complete=function(){var eventName=this.hasAnyBroken?'fail':'done';this.isComplete=true;var _this=this;setTimeout(function(){_this.emit(eventName,_this);_this.emit('always',_this);if(_this.jqDeferred){var jqMethod=_this.hasAnyBroken?'reject':'resolve';_this.jqDeferred[jqMethod](_this);}});};if($){$.fn.imagesLoaded=function(options,callback){var instance=new ImagesLoaded(this,options,callback);return instance.jqDeferred.promise($(this));};}
var cache={};function LoadingImage(img){this.img=img;}
LoadingImage.prototype=new EventEmitter();LoadingImage.prototype.check=function(){var cached=cache[this.img.src];if(cached){this.useCached(cached);return;}
cache[this.img.src]=this;if(this.img.complete&&this.img.naturalWidth!==undefined){this.confirm(this.img.naturalWidth!==0,'naturalWidth');return;}
var proxyImage=this.proxyImage=new Image();eventie.bind(proxyImage,'load',this);eventie.bind(proxyImage,'error',this);proxyImage.src=this.img.src;};LoadingImage.prototype.useCached=function(cached){if(cached.isConfirmed){this.confirm(cached.isLoaded,'cached was confirmed');}else{var _this=this;cached.on('confirm',function(image){_this.confirm(image.isLoaded,'cache emitted confirmed');return true;});}};LoadingImage.prototype.confirm=function(isLoaded,message){this.isConfirmed=true;this.isLoaded=isLoaded;this.emit('confirm',this,message);};LoadingImage.prototype.handleEvent=function(event){var method='on'+event.type;if(this[method]){this[method](event);}};LoadingImage.prototype.onload=function(){this.confirm(true,'onload');this.unbindProxyEvents();};LoadingImage.prototype.onerror=function(){this.confirm(false,'onerror');this.unbindProxyEvents();};LoadingImage.prototype.unbindProxyEvents=function(){eventie.unbind(this.proxyImage,'load',this);eventie.unbind(this.proxyImage,'error',this);};return ImagesLoaded;}
if(typeof define==='function'&&define.amd){define(['eventEmitter/EventEmitter','eventie/eventie'],defineImagesLoaded);}else{window.imagesLoaded=defineImagesLoaded(window.EventEmitter,window.eventie);}})(window);;!function($){$(document).ready(function(){$window=$(window);(function(){var mainnav=$('#t3-header');var elmHeight=mainnav.outerHeight(true);if(mainnav.length)
{var elmHeight=mainnav.outerHeight(true);$(window).scroll(function(){var scrolltop=$(window).scrollTop();if(scrolltop>elmHeight)
{if(!mainnav.hasClass('affix'))
{mainnav.addClass('affix');}}
else
{mainnav.removeClass('affix');}})}})();var offset=220;var duration=500;jQuery(window).scroll(function(){if(jQuery(this).scrollTop()>offset){jQuery('.back-to-top').fadeIn(duration);}else{jQuery('.back-to-top').fadeOut(duration);}});jQuery('.back-to-top').click(function(event){event.preventDefault();jQuery('html, body').animate({scrollTop:0},duration);return false;});(function($){$('.noo-progress-bar .progress').each(function(i){var progress_bar=$(this).find('.progress-bar');progress_bar.appear(function(){var percent=$(this).data('valuenow');var $endNum=parseInt($(this).find('.progress_label > span').text());var $that=$(this);$(this).css({'width':0+'%'}).animate({'width':percent+'%'},1600,'easeOutCirc',function(){});$(this).find('.progress_label').animate({'opacity':1},1350);$(this).find('.progress_label > span').countTo({from:0,to:$endNum,speed:1100,refreshInterval:30,onComplete:function(){}});if(percent=='100'){$that.addClass('full');}});});})(jQuery);$('.animatedParent').appear(function(){var ele=$(this).find('.animated');var parent=$(this);ele.addClass('go');});(function(){jQuery('#button1').click(function(e){e.preventDefault();var baseHeight=$(window).height();var heightMainnav=$('#t3-header').outerHeight(true);jQuery.scrollTo(baseHeight-heightMainnav,{duration:500});});})();var isMobile={Android:function(){return navigator.userAgent.match(/Android/i);},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i);},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i);},Opera:function(){return navigator.userAgent.match(/Opera Mini/i);},Windows:function(){return navigator.userAgent.match(/IEMobile/i);},any:function(){return(isMobile.Android()||isMobile.BlackBerry()||isMobile.iOS()||isMobile.Opera()||isMobile.Windows());}};testMobile=isMobile.any();if(testMobile==null&&$('.parallax .bg')!=undefined)
{$('.parallax .bg').parallax("50%",0.05);}});}(jQuery);;jQuery(document).ready(function($){$('.t3-navbar').each(function(){var $navwrapper=$(this),$menu=null,$placeholder=null;if($navwrapper.find('.t3-megamenu').length){$menu=$navwrapper.find('ul.level0').clone(),$placeholder=$navwrapper.prev('.navbar-collapse');if(!$placeholder.length){$placeholder=$navwrapper.closest('.container, .t3-mainnav').find('.navbar-collapse:empty');}
var lis=$menu.find('li[data-id]'),liactive=lis.filter('.current');lis.removeClass('mega dropdown mega-align-left mega-align-right mega-align-center mega-align-adjust');lis.each(function(){var $li=$(this),$child=$li.find('>:first-child');if($child[0].nodeName=='DIV'){$child.find('>:first-child').prependTo($li);$child.remove();}
if($li.data('hidewcol')){$child.find('.caret').remove();$child.nextAll().remove();return;}
var subul=$li.find('ul.level'+$li.data('level'));if(subul.length){$ul=$('<ul class="level'+$li.data('level')+' dropdown-menu">');subul.each(function(){if($(this).parents('.mega-col-nav').data('hidewcol'))return;$(this).find('>li').appendTo($ul);});if($ul.children().length){$ul.appendTo($li);}}
$li.find('>div').remove();if(!$li.children('ul').length){$child.find('.caret').remove();}
var divider=$li.hasClass('divider');for(var x in $li.data()){$li.removeAttr('data-'+x)}
$child.removeAttr('class');for(var x in $child.data()){$child.removeAttr('data-'+x)}
if(divider){$li.addClass('divider');}});liactive.addClass('current active');}else{$menu=$navwrapper.find('ul.nav').clone();$placeholder=$('.t3-navbar-collapse:empty, .navbar-collapse:empty').eq(0);}
$menu.find('a[data-toggle="dropdown"]').removeAttr('data-toggle').removeAttr('data-target');$menu.find('> li > ul.dropdown-menu').prev('a').attr('data-toggle','dropdown').attr('data-target','#').parent('li').addClass(function(){return'dropdown'+($(this).data('level')>1?' dropdown-submenu':'');});$menu.appendTo($placeholder);});});