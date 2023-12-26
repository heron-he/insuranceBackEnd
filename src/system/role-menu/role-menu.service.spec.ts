import { Test, TestingModule } from '@nestjs/testing';
import { RoleMenuService } from './role-menu.service';

describe('RoleMenuService', () => {
    let service: RoleMenuService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RoleMenuService],
        }).compile();

        service = module.get<RoleMenuService>(RoleMenuService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
