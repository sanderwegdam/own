<?php
	class Voorraad_model extends CI_Model {
		public function __construct(){
			$this->load->database();
		}

		public function get_voorraad($slug = FALSE){
			if($slug === FALSE){
				$this->db->order_by('id', 'DESC');
				//$this->db->join('voorraad', 'voorraad.id = producten.voorraad_id');
				$query = $this->db->get('voorraad');
				return $query->result_array();
			}
			$query = $this->db->get_where('voorraad', array('slug' => $slug));
			return $query->row_array();
		}

		public function maak_voorraad() {
			
			$slug = url_title($this->input->post('onderdeel'));

			$data = array (
				'slug' => $slug,
				'onderdeel' => $this->input->post('onderdeel'),
				'beschrijving' => $this->input->post('beschrijving'),
				'aantal' => $this->input->post('aantal'),
				'leverancier' => $this->input->post('leverancier'));


			return $this->db->insert('voorraad', $data);
		}
		public function delete_voorraad($id) {
			$this->db->where('id', $id);
			$this->db->delete('voorraad');
			return true;
		}

		public function update_voorraad() {

				$slug = url_title($this->input->post('onderdeel'));

				$data = array (		
				'leverancier' => $this->input->post('leverancier'),
				'beschrijving' => $this->input->post('beschrijving'),
				'aantal' => $this->input->post('aantal'),
				'onderdeel' => $this->input->post('onderdeel'));
		
				$this->db->where('id', $this->input->post('id'));
				return $this->db->update('voorraad', $data);
		}

		public function krijg_voorraad() {
			$this->db->order_by('name');
			$query = $this->db->get('voorraad');
			return $query->result_array();		
		}
	}