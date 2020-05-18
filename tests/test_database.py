import unittest
from planner.Models.DataModels.DateRange import DateRange

from planner.Sql.DateWeekTable import DateWeekTable
from planner.Sql.DepartmentTable import DepartmentTable
from planner.Sql.WorkerTables.WorkerSummaryTable import WorkerSummaryTable
from planner.Sql.WorkerTables.WorkerPlanTable import WorkerPlanTable
from planner.Sql.WorkerTables.WorkerFtfp import WorkerFtfpTable
from planner.Sql.WorkerTables.WorkerTable import WorkerTable
from planner.Sql.ProjectTables.ProjetDetails import ProjectTable, OpportunityTable
from planner.Sql.ProjectTables.ProjectPhasesTable import ProjecPhasesTable
from planner.Sql.ProjectTables.ProjectWorkersTable import ProjectWorkersTable
from planner.Sql.ProjectTables.ProjectSummaryTable import ProjectSumaryTable


class TestDatabase(unittest.TestCase):
    
    '''to run tests run >python -m unittest from project root'''

    def setUp(self) -> None:
        pass


    def tearDown(self) -> None:
        pass


    def test_read_date_week(self) -> None:
        table = DateWeekTable()
        date_range = DateRange("2020", "2020", "1", "11")
        table.read_date_week(date_range)
        assert "weeks: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']" in table.__str__()
    

    def test_get_user_details(self) -> None:
        table = DepartmentTable()
        table.get_user_details("mbendik")
        assert "workerFullName: ['Bendík Marián']" in table.__str__()


    def test_read_worker_summary_plan(self) -> None:
        table = WorkerSummaryTable()
        date_range = DateRange("2020", "2020", "1", "11")
        table.get_worker_summary_plan("mbendik", date_range)
        assert "planned: [133, 130, 130, 150, 80, 40, 40, 40, 80, 40, 40]" in table.__str__()
    

    def test_get_planned_hours(self) -> None:
        table = WorkerPlanTable()
        date_range = DateRange("2020", "2020", "1", "11")
        table.get_planned_hours("4", date_range)
        assert "planned: [50, 30, 1, 1, 30, 30, 30, 30, 2, 2, 99, 20, 2, 10, 20, 50, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32]" in table.__str__()
    

    def test_get_opportunity_list(self) -> None:
        table = OpportunityTable()
        table.get_opportunity_list()
        assert "cid: ['NE94', 'TI16', 'SO10', 'KI81', 'HE78', 'DA92'" in table.__str__()


    def test_get_phases(self) -> None:
        table = ProjecPhasesTable()
        table.get_phases("112")
        assert "phaseId: [372, 406, 407]" in table.__str__()


    def test_get_project_workers(self) -> None:
        table = ProjectWorkersTable()
        table.get_project_workers("4777")
        assert "workerId: ['kondrusova', 'zpolackova', 'lcejka', 'tvolny', 'msamonil']" in table.__str__()


    def test_get_planned_hours(self) -> None:
        table = WorkerFtfpTable()
        table.get_planned_hours("jmotejlek", "23925")
        assert "planned: ['30']" in table.__str__()

    
    def test_get_workers_on_project(self) -> None:
        date_range = DateRange("2020", "2020", "1", "11")
        table = WorkerPlanTable()
        table.get_workers_on_project("4777", date_range)        
        assert "workerId: ['mbendik', 'mbendik', 'mbendik', 'vcerna', 'vcerna', 'vcerna'" in table.__str__()

    
    def test_get_project_summary_plan(self) -> None:
        date_range = DateRange("2020", "2020", "1", "11")
        table = ProjectSumaryTable()
        table.get_project_summary_plan("4777", date_range)
        assert "planned: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60]" in table.__str__()


    def test_get_worker_alocation(self) -> None:
        table = WorkerPlanTable()
        date_range = DateRange("2020", "2020", "1", "11")
        self.assertEqual(table.get_worker_alocation("mbendik", date_range), "133")


    def test_get_user_full_name(self) -> None:
        table = WorkerTable()
        table.get_user_full_name("mbendik")
        assert "surname: ['Bendík']" in table.__str__()
