                <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h2><?= $title ?></h2>
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">
                            <ul class="list-group">
                                   <?php foreach($voorraadlijst as $voorraad) : ?>
            <li class="list-group-item"><?php echo $voorraad['onderdeel']; ?></a></li>
            <?php endforeach; ?>  
                            </ul>
                        </div>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->
                </div>
                <!-- /.col-lg-6 -->                
            </div>