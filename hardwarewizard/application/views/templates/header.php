<nav class="navbar navbar-inverse">
  <div class="container">
    <div class="navbar-header">
      <a class="navbar-brand" href="<?php echo base_url(); ?>">HardwareWizard</a>
    </div>
    <div id="navbar">
    	<ul class="nav navbar-nav">
    	</ul>
    	<ul class="nav navbar-nav navbar-right">  
      		<li> <a href="<?php echo base_url(); ?>voorraad/maak">Maak voorraad item</a></li>
      		<li><a href="<?php echo base_url(); ?>producten/maak">Koppel product aan voorraadlijst item</a></li> 
    	</ul>
    	</div>
    </div>

<div class="navbar-default sidebar" role="navigation">
                <div class="sidebar-nav navbar-collapse">
                    <ul class="nav" id="side-menu">
                        <li>
                            <a href="#"><i class="fa fa-bar-chart-o fa-fw"></i>
                            Voorraad<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level">
                                <li>
                                    <a href="<?php echo base_url(); ?>voorraad/maak">Maak voorraad item</a>
                                </li>                                
                            </ul>
                            <!-- /.nav-second-level -->
                        </li>                                       
                        <li>
                            <a href="#"><i class="fa fa-wrench fa-fw"></i>ICT-producten<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level">
                                <li>
                                    <a href="<?php echo base_url(); ?>producten/maak">Koppel product aan voorraadlijst item</a>
                                </li>                               
                            </ul>
                            <!-- /.nav-second-level -->
                        </li>                                              
                    </ul>
                </div>
                <!-- /.sidebar-collapse -->
            </div>
            <!-- /.navbar-static-side -->
        </nav>

  <div id="page-wrapper">
            <div class="row">          
            </div>
            <!-- /.row -->
            <div class="row">
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <div class="row">                              
                            </div>
                        </div>
                        <a href="<?php echo base_url(); ?>producten">
                            <div class="panel-footer">
                                <span>ICT-producten</span>
                              <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <div class="row">                               
                             </div>
                        </div>
                        <a href="<?php echo base_url(); ?>voorraad">
                            <div class="panel-footer">
                                <span class="pull-left">Voorraad</span>
                              <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <div class="row">                                            
                            </div>
                        </div>
                        <a href="<?php echo base_url(); ?>voorraadlijst">
                            <div class="panel-footer">
                                <span class="pull-left">Voorraadlijst</span>
                              <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>              
            </div>