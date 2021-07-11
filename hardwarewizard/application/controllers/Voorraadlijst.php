<?php 
	class Voorraadlijst extends CI_Controller{
			public function index(){
			$data['title'] = 'Voorraadlijst items';

			$data['voorraadlijst'] = $this->voorraadlijst_model->get_voorraadlijst();

			$this->load->view('stylesheets/voorraadlijst');
			$this->load->view('templates/header');
			$this->load->view('voorraadlijst/index', $data);
			$this->load->view('templates/footer');
		}		


			public function maak() {
			$data['title'] = 'Maak voorraadlijst naam';

			$this->form_validation->set_rules('name', 'Name', 'required');

			if ($this->form_validation->run() === FALSE){
                $this->load->view('templates/style');
				$this->load->view('templates/header');
				$this->load->view('voorraadlijst/maak', $data);
				$this->load->view('templates/footer');
			} else {
				$this->voorraadlijst_model->maak_voorraadlijst();
				redirect('voorraadlijst');
			}
		}

			public function posts($id){

			$data['title'] = $this->voorraadlijst_model->	
			selecteer_voorraadlijst($id)->name; //only name

			$data['producten'] = $this->product_model->selecteer_producten_van_voorraad($id);

                $this->load->view('templates/style');
				$this->load->view('templates/header');
				$this->load->view('producten/index', $data);
				$this->load->view('templates/footer');

		}

		public function update() {
				$this->voorraadlijst_model->update_voorraadlijst();
				redirect('voorraad');
			}

	}
